#[derive(Debug, Clone, Copy)]
struct TimeSignature {
	numerator: u8,
	denominator: u8,
}

#[derive(Debug, Clone, Copy)]
struct Time {
	bar: u16,
	beat: u16,
	division: u16,
	ticks: u16,
}

#[derive(Debug)]
struct Event {
	position: Time,
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
