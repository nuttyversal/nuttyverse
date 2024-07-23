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

#[derive(Debug, Clone, Copy, PartialEq)]
struct Note {
	/// The pitch of the note.
	pitch: Pitch,

	/// The octave of the note.
	octave: u8,
}

#[derive(Debug, PartialEq)]
struct Event {
	/// The note that the event represents.
	note: Note,

	/// The position of the event in the sequence.
	position: Time,

	/// The length of the event in the sequence.
	length: Time,
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

fn engrave_starting_note(note: Note) -> String {
	let mut output = String::new();

	let pitch = match note.pitch {
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
	};

	let octave = match note.octave {
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

	output.push_str(pitch);
	output.push_str(octave);

	output
}

fn engrave_events(events: Vec<Event>) -> Result<String, Box<dyn Error>> {
	let mut output = String::new();

	output.push_str("\\relative { ");

	if let Some(head) = events.first() {
		output.push_str(&engrave_starting_note(head.note));

		let (_, tail) = events.split_at(1);

		for event in tail {
			output.push_str(" ");
			output.push_str(&engrave_starting_note(event.note));
		}
	}

	output.push_str(" }");

	Ok(output)
}

#[cfg(test)]
mod tests {
	use super::*;

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
 	  	 30 2 1 1 	 Note	 1	 A3	 90	 0 0 1 80
			 Rel Vel			 64
 	  	 30 2 2 81 	 Note	 1	 D4	 90	 0 0 1 80
			 Rel Vel			 64
 	  	 30 2 3 161 	 Note	 1	 C♯4	 90	 0 0 1 80
			 Rel Vel			 64
 	  	 30 3 1 1 	 Note	 1	 A3	 90	 0 2 0 0
			 Rel Vel			 64
	";

	let events = parse_events(excerpt);
	let event_count = events.len();
	let engraving = engrave_events(events)?;

	println!("Parsed {} events", event_count);
	println!("{}", engraving);

	Ok(())
}
