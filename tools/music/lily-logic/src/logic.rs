use nom::branch::alt;
use nom::bytes::complete::tag;
use nom::character::complete::{space0, space1, u32, u8};
use nom::combinator::value;
use nom::sequence::tuple;
use nom::IResult;

/// Represents the pitch of a note.
#[derive(Clone, Copy, Debug, PartialEq)]
pub enum Pitch {
	C,
	Cis,
	D,
	Dis,
	E,
	F,
	Fis,
	G,
	Gis,
	A,
	Ais,
	B,
}

/// Represents a note.
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct Note {
	/// The pitch of the note.
	pub pitch: Pitch,

	/// The octave of the note.
	pub octave: u8,
}

/// Represents a position or length of an event.
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct Time {
	/// The bar number.
	bar: u32,

	/// The beat number.
	beat: u32,

	/// The division number.
	division: u32,

	/// The tick number.
	ticks: u32,
}

/// Represents a Logic Pro event.
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct Event {
	/// The note that the event represents.
	pub note: Note,

	/// The position of the event in the sequence.
	pub position: Time,

	/// The length of the event in the sequence.
	pub length: Time,
}

/// Parses a time value. The time value is expected to be in the format
/// "bar beat division ticks". For example, "1 2 3 4" would represent
/// bar 1, beat 2, division 3, and ticks 4.
fn parse_time(input: &str) -> IResult<&str, Time> {
	let parse_bar = u32;
	let parse_beat = u32;
	let parse_division = u32;
	let parse_ticks = u32;

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

/// Parses a note value. The note value is expected to be in the format
/// "<pitch><octave>". For example, "C4" would represent the note C in
/// the fourth octave; or middle C.
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

/// Parses an event value. The event value is expected to be in the
/// format "<time> Note <channel> <note> <velocity> <time>". For
/// example, the event "1 2 1 1 Note 1 C4 127 0 2 0 0" would represent
/// a note event at bar 1, beat 2, with a channel of 1, a note of C in
/// the fourth octave, a velocity of 127, and a length of two beats.
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

/// Parses a sequence of events separated by newlines. Any lines that
/// cannot be parsed as events are ignored.
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
			parse_event("27 1 1 1 	 Note	 1	 A3	 90	 0 2 1 0"),
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
			parse_event("30 2 3 161 	 Note	 1	 C♯4	 90	 0 0 1 80"),
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
