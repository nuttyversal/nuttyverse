use core::panic;
use std::error::Error;

use nom::branch::alt;
use nom::bytes::complete::tag;
use nom::character::complete::{space0, space1, u16, u8};
use nom::combinator::value;
use nom::sequence::tuple;
use nom::IResult;

#[derive(Debug, Clone, Copy)]
struct TimeSignature {
	/// The number of beats in a bar.
	numerator: u8,

	/// The note value that represents one beat.
	denominator: u8,
}

#[derive(Debug, Clone, Copy, PartialEq)]
struct Time {
	/// The bar number (one-based indexing).
	bar: u16,

	/// The beat number (one-based indexing).
	beat: u16,

	/// The division number (one-based indexing).
	division: u16,

	/// The tick number (one-based indexing).
	ticks: u16,
}

#[derive(Debug, Clone, Copy, PartialEq)]
enum Pitch {
	/// C
	C,

	/// C♯
	Cis,

	/// D
	D,

	/// D♯
	Dis,

	/// E
	E,

	/// F
	F,

	/// F♯
	Fis,

	/// G
	G,

	/// G♯
	Gis,

	/// A
	A,

	/// A♯
	Ais,

	/// B
	B,
}

impl Pitch {
	fn to_lilypond(&self) -> &str {
		match self {
			Pitch::C => "c",
			Pitch::Cis => "cis",
			Pitch::D => "d",
			Pitch::Dis => "dis",
			Pitch::E => "e",
			Pitch::F => "f",
			Pitch::Fis => "fis",
			Pitch::G => "g",
			Pitch::Gis => "gis",
			Pitch::A => "a",
			Pitch::Ais => "ais",
			Pitch::B => "b",
		}
	}
}

#[derive(Debug, Clone, Copy, PartialEq)]
struct Note {
	/// The pitch of the note.
	pitch: Pitch,

	/// The octave of the note.
	octave: u8,
}

impl Note {
	fn to_midi_value(&self) -> u8 {
		let pitch_value = match self.pitch {
			Pitch::C => 0,
			Pitch::Cis => 1,
			Pitch::D => 2,
			Pitch::Dis => 3,
			Pitch::E => 4,
			Pitch::F => 5,
			Pitch::Fis => 6,
			Pitch::G => 7,
			Pitch::Gis => 8,
			Pitch::A => 9,
			Pitch::Ais => 10,
			Pitch::B => 11,
		};

		12 * (self.octave + 1) + pitch_value
	}

	fn to_lilypond(&self) -> String {
		let octave = match self.octave {
			0 => ",,,",
			1 => ",,",
			2 => ",",
			3 => "",
			4 => "'",
			5 => "''",
			6 => "'''",
			7 => "''''",
			8 => "'''''",
			9 => "''''''",
			_ => unreachable!(),
		};

		return format!("{}{}", self.pitch.to_lilypond(), octave);
	}
}

#[derive(Debug, Clone, Copy, PartialEq)]
struct Ticks {
	value: u16,
}

impl Ticks {
	fn new(value: u16) -> Ticks {
		Ticks { value }
	}

	fn set(&mut self, value: u16) {
		self.value = value;
	}

	fn decrement(&mut self, value: u16) {
		self.value -= value;
	}

	fn to_lilypond(&self) -> String {
		match self.value {
			3840 => "1".to_string(),
			2880 => "2.".to_string(),
			1920 => "2".to_string(),
			1440 => "4.".to_string(),
			960 => "4".to_string(),
			720 => "8.".to_string(),
			480 => "8".to_string(),
			360 => "16.".to_string(),
			240 => "16".to_string(),
			180 => "32.".to_string(),
			120 => "32".to_string(),
			90 => "64.".to_string(),
			60 => "64".to_string(),
			_ => panic!("Failed to convert ticks into LilyPond notation."),
		}
	}
}

#[derive(Debug, Clone, Copy, PartialEq)]
struct Event {
	/// The note that the event represents.
	note: Note,

	/// The position of the event in the sequence.
	position: Time,

	/// The length of the event in the sequence.
	length: Time,
}

impl Event {
	fn ticks(&self, time_signature: TimeSignature) -> Ticks {
		// A tick represents a 1/3840th note (960 PPQN).
		let ticks_in_whole_note = 3840;

		// Each subdivision in Logic Pro is a 16th note.
		let ticks_per_division = 240;

		// The number of ticks in a beat is determined by which note value represents one beat.
		let ticks_per_beat = ticks_in_whole_note / time_signature.denominator as u16;

		// Convert the units of time into ticks.
		Ticks::new(
			self.length.bar * ticks_per_beat * time_signature.numerator as u16
				+ self.length.beat * ticks_per_beat
				+ self.length.division * ticks_per_division
				+ self.length.ticks,
		)
	}
}

#[derive(Debug)]
struct Engraver {
	/// The events to be engraved.
	events: Vec<Event>,

	/// The event that was last engraved previously.
	previous_event: Option<Event>,

	/// The time signature of the engraving.
	time_signature: TimeSignature,

	/// The index of the current event being engraved.
	current_note_index: usize,

	/// The number of ticks remaining in the current event.
	ticks_remaining_in_event: Ticks,

	/// The number of ticks remaining in the current bar.
	ticks_remaining_in_bar: Ticks,

	/// The number of ticks remaining in the current beat.
	ticks_remaining_in_beat: Ticks,

	/// The LilyPond output notation.
	output: String,
}

impl Engraver {
	fn new(time_signature: TimeSignature, events: Vec<Event>) -> Engraver {
		let ticks_per_beat = 3840 / time_signature.denominator as u16;
		let ticks_per_bar = ticks_per_beat * time_signature.numerator as u16;

		let first_event_ticks = if let Some(first_event) = events.first() {
			first_event.ticks(time_signature).value
		} else {
			0
		};

		Engraver {
			events,
			previous_event: None,
			time_signature,
			current_note_index: 0,
			ticks_remaining_in_event: Ticks::new(first_event_ticks),
			ticks_remaining_in_bar: Ticks::new(ticks_per_bar),
			ticks_remaining_in_beat: Ticks::new(ticks_per_beat),
			output: String::new(),
		}
	}

	fn engrave(&mut self) -> String {
		while !self.has_next_event() {
			self.engrave_next_event();
		}

		self.wrap_relative_command();
		self.output.clone()
	}

	fn engrave_next_event(&mut self) -> () {
		let current_event = self.events[self.current_note_index];

		while self.ticks_remaining_in_event.value > 0 {
			self.output.push_str(current_event.note.pitch.to_lilypond());

			// If the event is longer than the beat, split it into multiple beats.
			if self.ticks_remaining_in_event.value > self.ticks_remaining_in_beat.value {
				self
					.output
					.push_str(self.ticks_remaining_in_beat.to_lilypond().as_str());

				self
					.ticks_remaining_in_event
					.decrement(self.ticks_remaining_in_beat.value);

				self
					.ticks_remaining_in_bar
					.decrement(self.ticks_remaining_in_beat.value);

				self
					.ticks_remaining_in_beat
					.decrement(self.ticks_remaining_in_beat.value);

				if self.ticks_remaining_in_event.value > 0 {
					// Tie this note into the next note.
					self.output.push_str("~");
				}
			} else {
				self
					.output
					.push_str(self.ticks_remaining_in_event.to_lilypond().as_str());

				self
					.ticks_remaining_in_bar
					.decrement(self.ticks_remaining_in_event.value);

				self
					.ticks_remaining_in_beat
					.decrement(self.ticks_remaining_in_event.value);

				self.ticks_remaining_in_event.set(0);
			}

			if self.ticks_remaining_in_beat.value <= 0 {
				// Reset the beat.
				let ticks_per_beat = 3840 / self.time_signature.denominator as u16;
				self.ticks_remaining_in_beat.set(ticks_per_beat)
			}

			if self.ticks_remaining_in_bar.value <= 0 {
				// Reset the bar.
				let ticks_per_beat = 3840 / self.time_signature.denominator as u16;
				let ticks_per_bar = ticks_per_beat * self.time_signature.numerator as u16;
				self.ticks_remaining_in_bar.set(ticks_per_bar);
				self.output.push_str(" |");
			}

			// Write a space between notes.
			self.output.push_str(" ");
		}

		// Update state.
		self.ticks_remaining_in_event = match self.events.get(self.current_note_index + 1) {
			Some(next_event) => next_event.ticks(self.time_signature),
			None => Ticks::new(0),
		};

		self.previous_event = Some(current_event);
		self.current_note_index += 1;
	}

	fn wrap_relative_command(&mut self) -> () {
		self.output.insert_str(0, "\\relative { ");
		self.output.push_str("}");
	}

	fn has_next_event(&self) -> bool {
		self.current_note_index >= self.events.len()
	}
}

fn parse_time(input: &str) -> IResult<&str, Time> {
	let parse_bar = u16;
	let parse_beat = u16;
	let parse_division = u16;
	let parse_ticks = u16;

	let mut parse = tuple((
		parse_bar,
		space1,
		parse_beat,
		space1,
		parse_division,
		space1,
		parse_ticks,
	));

	parse(input).map(|(next_input, output)| {
		let (bar, _, beat, _, division, _, ticks) = output;

		let time = Time {
			bar,
			beat,
			division,
			ticks,
		};

		(next_input, time)
	})
}

fn parse_note(input: &str) -> IResult<&str, Note> {
	let parse_pitch = alt((
		value(Pitch::Cis, tag("C♯")),
		value(Pitch::Dis, tag("D♯")),
		value(Pitch::Fis, tag("F♯")),
		value(Pitch::Gis, tag("G♯")),
		value(Pitch::Ais, tag("A♯")),
		value(Pitch::C, tag("C")),
		value(Pitch::D, tag("D")),
		value(Pitch::E, tag("E")),
		value(Pitch::F, tag("F")),
		value(Pitch::G, tag("G")),
		value(Pitch::A, tag("A")),
		value(Pitch::B, tag("B")),
	));

	let parse_octave = u8;
	let mut parse = tuple((parse_pitch, parse_octave));

	parse(input).map(|(next_input, output)| {
		let (pitch, octave) = output;
		let note = Note { pitch, octave };

		(next_input, note)
	})
}

fn parse_event(input: &str) -> IResult<&str, Event> {
	let parse_delimiter = space0;
	let parse_tag = tag("Note");
	let parse_channel = u8;
	let parse_velocity = u8;

	let mut parse = tuple((
		parse_delimiter,
		parse_time,
		parse_delimiter,
		parse_tag,
		parse_delimiter,
		parse_channel,
		parse_delimiter,
		parse_note,
		parse_delimiter,
		parse_velocity,
		parse_delimiter,
		parse_time,
		parse_delimiter,
	));

	parse(input).map(|(next_input, output)| {
		let (_, position, _, _, _, _, _, note, _, _, _, length, _) = output;

		let event = Event {
			note,
			position,
			length,
		};

		(next_input, event)
	})
}

fn parse_events(input: &str) -> Vec<Event> {
	let mut events = Vec::new();
	let lines = input.lines();

	for line in lines {
		if let Ok((_, event)) = parse_event(line) {
			events.push(event);
		}
	}

	events
}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn test_note_to_midi_value() {
		assert_eq!(
			Note {
				pitch: Pitch::Dis,
				octave: 3
			}
			.to_midi_value(),
			51
		);

		assert_eq!(
			Note {
				pitch: Pitch::E,
				octave: 4
			}
			.to_midi_value(),
			64
		);

		assert_eq!(
			Note {
				pitch: Pitch::Fis,
				octave: 6
			}
			.to_midi_value(),
			90
		);

		assert_eq!(
			Note {
				pitch: Pitch::Gis,
				octave: 8
			}
			.to_midi_value(),
			116
		);
	}

	#[test]
	fn test_event_ticks() {
		let time_signature = TimeSignature {
			numerator: 4,
			denominator: 4,
		};

		assert_eq!(
			Event {
				note: Note {
					pitch: Pitch::C,
					octave: 4
				},
				position: Time {
					bar: 1,
					beat: 1,
					division: 1,
					ticks: 1
				},
				length: Time {
					bar: 0,
					beat: 2,
					division: 1,
					ticks: 0
				}
			}
			.ticks(time_signature),
			Ticks::new(2160)
		);

		assert_eq!(
			Event {
				note: Note {
					pitch: Pitch::D,
					octave: 5
				},
				position: Time {
					bar: 2,
					beat: 3,
					division: 1,
					ticks: 161
				},
				length: Time {
					bar: 1,
					beat: 0,
					division: 1,
					ticks: 80
				}
			}
			.ticks(time_signature),
			Ticks::new(4160)
		);

		let time_signature = TimeSignature {
			numerator: 6,
			denominator: 8,
		};

		assert_eq!(
			Event {
				note: Note {
					pitch: Pitch::D,
					octave: 5
				},
				position: Time {
					bar: 2,
					beat: 3,
					division: 1,
					ticks: 161
				},
				length: Time {
					bar: 1,
					beat: 0,
					division: 1,
					ticks: 80
				}
			}
			.ticks(time_signature),
			Ticks::new(3200)
		);
	}

	#[test]
	fn test_parse_note() {
		assert_eq!(
			parse_note("C4"),
			Ok((
				"",
				Note {
					pitch: Pitch::C,
					octave: 4
				}
			))
		);

		assert_eq!(
			parse_note("D♯5"),
			Ok((
				"",
				Note {
					pitch: Pitch::Dis,
					octave: 5
				}
			))
		);

		assert_eq!(
			parse_note("G♯2"),
			Ok((
				"",
				Note {
					pitch: Pitch::Gis,
					octave: 2
				}
			))
		);
	}

	#[test]
	fn test_parse_time() {
		assert_eq!(
			parse_time("1 1 1 1"),
			Ok((
				"",
				Time {
					bar: 1,
					beat: 1,
					division: 1,
					ticks: 1
				}
			))
		);

		assert_eq!(
			parse_time("30 2 3 161"),
			Ok((
				"",
				Time {
					bar: 30,
					beat: 2,
					division: 3,
					ticks: 161
				}
			))
		);
	}

	#[test]
	fn test_parse_event() {
		assert_eq!(
			parse_event(" 	  	 27 1 1 1 	 Note	 1	 A3	 90	 0 2 1 0"),
			Ok((
				"",
				Event {
					note: Note {
						pitch: Pitch::A,
						octave: 3
					},
					position: Time {
						bar: 27,
						beat: 1,
						division: 1,
						ticks: 1
					},
					length: Time {
						bar: 0,
						beat: 2,
						division: 1,
						ticks: 0
					}
				}
			))
		);

		assert_eq!(
			parse_event(" 	  	 30 2 3 161 	 Note	 1	 C♯4	 90	 0 0 1 80"),
			Ok((
				"",
				Event {
					note: Note {
						pitch: Pitch::Cis,
						octave: 4
					},
					position: Time {
						bar: 30,
						beat: 2,
						division: 3,
						ticks: 161
					},
					length: Time {
						bar: 0,
						beat: 0,
						division: 1,
						ticks: 80
					}
				}
			))
		)
	}

	#[test]
	fn test_parse_events() {
		let input = "
 	  	 30 2 1 1 	 Note	 1	 A3	 90	 0 0 1 80
			 Rel Vel			 64
 	  	 30 2 2 81 	 Note	 1	 D4	 90	 0 0 1 80
			 Rel Vel			 64
 	  	 30 2 3 161 	 Note	 1	 C♯4	 90	 0 0 1 80
			 Rel Vel			 64
 	  	 30 3 1 1 	 Note	 1	 A3	 90	 0 2 0 0
			 Rel Vel			 64
		";

		assert_eq!(
			parse_events(input),
			vec![
				Event {
					note: Note {
						pitch: Pitch::A,
						octave: 3
					},
					position: Time {
						bar: 30,
						beat: 2,
						division: 1,
						ticks: 1
					},
					length: Time {
						bar: 0,
						beat: 0,
						division: 1,
						ticks: 80
					}
				},
				Event {
					note: Note {
						pitch: Pitch::D,
						octave: 4
					},
					position: Time {
						bar: 30,
						beat: 2,
						division: 2,
						ticks: 81
					},
					length: Time {
						bar: 0,
						beat: 0,
						division: 1,
						ticks: 80
					}
				},
				Event {
					note: Note {
						pitch: Pitch::Cis,
						octave: 4
					},
					position: Time {
						bar: 30,
						beat: 2,
						division: 3,
						ticks: 161
					},
					length: Time {
						bar: 0,
						beat: 0,
						division: 1,
						ticks: 80
					}
				},
				Event {
					note: Note {
						pitch: Pitch::A,
						octave: 3
					},
					position: Time {
						bar: 30,
						beat: 3,
						division: 1,
						ticks: 1
					},
					length: Time {
						bar: 0,
						beat: 2,
						division: 0,
						ticks: 0
					}
				}
			]
		);
	}
}

fn main() -> Result<(), Box<dyn Error>> {
	let excerpt = "
 	  	 27 1 1 1 	 Note	 1	 A3	 90	 0 2 1 0
			 Rel Vel			 64
 	  	 27 3 2 1 	 Note	 1	 G3	 90	 0 0 1 0
			 Rel Vel			 64
 	  	 27 3 3 1 	 Note	 1	 F♯3	 90	 0 0 1 0
			 Rel Vel			 64
 	  	 27 3 4 1 	 Note	 1	 E3	 90	 0 0 1 0
			 Rel Vel			 64
 	  	 27 4 1 1 	 Note	 1	 D3	 90	 0 0 1 0
			 Rel Vel			 64
 	  	 27 4 2 1 	 Note	 1	 C♯3	 90	 0 0 1 0
			 Rel Vel			 64
 	  	 27 4 3 1 	 Note	 1	 D3	 90	 0 0 1 0
			 Rel Vel			 64
 	  	 27 4 4 1 	 Note	 1	 E3	 90	 0 0 1 0
			 Rel Vel			 64
 	  	 28 1 1 1 	 Note	 1	 B2	 90	 0 0 3 0
			 Rel Vel			 64
 	  	 28 1 4 1 	 Note	 1	 A2	 90	 0 3 1 0
			 Rel Vel			 64
 	  	 29 1 1 1 	 Note	 1	 D3	 90	 0 0 1 0
			 Rel Vel			 64
 	  	 29 1 2 1 	 Note	 1	 E3	 90	 0 0 1 0
			 Rel Vel			 64
 	  	 29 1 3 1 	 Note	 1	 C♯4	 90	 0 0 1 0
			 Rel Vel			 64
 	  	 29 1 4 1 	 Note	 1	 E3	 90	 0 0 1 0
			 Rel Vel			 64
 	  	 29 2 1 1 	 Note	 1	 D3	 90	 0 0 1 0
			 Rel Vel			 64
 	  	 29 2 2 1 	 Note	 1	 B3	 90	 0 0 1 0
			 Rel Vel			 64
 	  	 29 2 3 1 	 Note	 1	 D3	 90	 0 0 1 0
			 Rel Vel			 64
 	  	 29 2 4 1 	 Note	 1	 C♯3	 90	 0 0 1 0
			 Rel Vel			 64
 	  	 29 3 1 1 	 Note	 1	 A3	 90	 0 0 1 0
			 Rel Vel			 64
 	  	 29 3 2 1 	 Note	 1	 C♯3	 90	 0 0 1 0
			 Rel Vel			 64
 	  	 29 3 3 1 	 Note	 1	 B2	 90	 0 0 1 0
			 Rel Vel			 64
 	  	 29 3 4 1 	 Note	 1	 G3	 90	 0 0 1 0
			 Rel Vel			 64
 	  	 29 4 1 1 	 Note	 1	 B2	 90	 0 1 0 0
			 Rel Vel			 64
 	  	 30 1 1 1 	 Note	 1	 F♯3	 90	 0 0 3 0
			 Rel Vel			 64
 	  	 30 1 4 1 	 Note	 1	 G3	 90	 0 0 1 0
			 Rel Vel			 64
 	  // 	 30 2 1 1 	 Note	 1	 A3	 90	 0 0 1 80
			 // Rel Vel			 64
 	  // 	 30 2 2 81 	 Note	 1	 D4	 90	 0 0 1 80
			 // Rel Vel			 64
 	  // 	 30 2 3 161 	 Note	 1	 C♯4	 90	 0 0 1 80
			 // Rel Vel			 64
 	  // 	 30 3 1 1 	 Note	 1	 A3	 90	 0 2 0 0
			 // Rel Vel			 64
	";

	let events = parse_events(excerpt);
	let event_count = events.len();

	let common_time = TimeSignature {
		numerator: 4,
		denominator: 4,
	};

	let mut engraver = Engraver::new(common_time, events);
	let output = engraver.engrave();

	println!("Parsed {} events", event_count);
	println!("{}", output);

	Ok(())
}