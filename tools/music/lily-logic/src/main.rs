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
struct Event {
	/// The position of the event in the sequence.
	position: Time,

	/// The length of the event in the sequence.
	length: Time,
}

fn main() {
	let time_signature = TimeSignature {
		numerator: 4,
		denominator: 4,
	};

	let time = Time {
		bar: 1,
		beat: 1,
		division: 1,
		ticks: 1,
	};

	let event = Event {
		position: time,
		length: time,
	};

	println!("{:?}", time_signature);
	println!("{:?}", time);
	println!("{:?}", event);
}
