use std::error::Error;

#[derive(Debug, Clone, Copy)]
struct TimeSignature {
	/// The number of beats in a bar.
	numerator: u8,

	/// The note value that represents one beat.
	denominator: u8,
}

#[derive(Debug, Clone, Copy)]
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

#[derive(Debug)]
enum Pitch {
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

#[derive(Debug)]
struct Note {
	/// The pitch of the note.
	pitch: Pitch,

	/// The octave of the note.
	octave: u8,
}

#[derive(Debug)]
struct Event {
	/// The note that the event represents.
	note: Note,

	/// The position of the event in the sequence.
	position: Time,

	/// The length of the event in the sequence.
	length: Time,
}

fn main() -> Result<(), Box<dyn Error>> {
	let time_signature = TimeSignature {
		numerator: 4,
		denominator: 4,
	};

	let note = Note {
		pitch: Pitch::C,
		octave: 4,
	};

	let time = Time {
		bar: 1,
		beat: 1,
		division: 1,
		ticks: 1,
	};

	let event = Event {
		note,
		position: time,
		length: time,
	};

	println!("{:?}", time_signature);
	println!("{:?}", time);
	println!("{:?}", event);

	Ok(())
}
