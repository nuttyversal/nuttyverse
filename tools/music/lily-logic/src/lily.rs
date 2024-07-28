pub trait Engravable {
	fn engrave(&self) -> String;
}

/// Represents the name of a pitch.
#[derive(Clone, Copy, Debug, PartialEq)]
pub enum PitchName {
	C,
	D,
	E,
	F,
	G,
	A,
	B,
}

impl PitchName {
	/// Steps the pitch by a number of steps.
	pub fn step(&self, steps: usize) -> Self {
		let pitches = [
			PitchName::C,
			PitchName::D,
			PitchName::E,
			PitchName::F,
			PitchName::G,
			PitchName::A,
			PitchName::B,
		];

		// Unwrap is safe because the pitch is guaranteed to be in the array.
		let index = pitches.iter().position(|&pitch| pitch == *self).unwrap();

		pitches[(index + steps as usize) % pitches.len()]
	}
}

impl Engravable for PitchName {
	fn engrave(&self) -> String {
		match self {
			PitchName::C => "c".to_string(),
			PitchName::D => "d".to_string(),
			PitchName::E => "e".to_string(),
			PitchName::F => "f".to_string(),
			PitchName::G => "g".to_string(),
			PitchName::A => "a".to_string(),
			PitchName::B => "b".to_string(),
		}
	}
}

/// Represents an accidental, such as ♭ or ♯.
#[derive(Clone, Copy, Debug, PartialEq)]
pub enum Accidental {
	/// Double flat (𝄫).
	DoubleFlat,

	/// Flat (♭).
	Flat,

	/// Natural (♮).
	Natural,

	/// Sharp (♯).
	Sharp,

	/// Double sharp (𝄪).
	DoubleSharp,
}

impl Engravable for Accidental {
	fn engrave(&self) -> String {
		match self {
			Accidental::DoubleFlat => "eses".to_string(),
			Accidental::Flat => "es".to_string(),
			Accidental::Natural => "".to_string(),
			Accidental::Sharp => "is".to_string(),
			Accidental::DoubleSharp => "isis".to_string(),
		}
	}
}

/// Represents an octave changing mark in LilyPond, such as `'` or `,`.
/// These are used to change the octave of a note in relative mode.
enum OctaveChange {
	/// Number of octaves to raise.
	Raise(u8),

	/// Number of octaves to lower.
	Lower(u8),

	/// No octave change.
	None,
}

impl Engravable for OctaveChange {
	fn engrave(&self) -> String {
		match self {
			OctaveChange::Raise(n) => "'".repeat(*n as usize),
			OctaveChange::Lower(n) => ",".repeat(*n as usize),
			OctaveChange::None => "".to_string(),
		}
	}
}

/// Represents a pitch in relative mode.
pub struct RelativePitch {
	/// The pitch of the note.
	pub name: PitchName,

	/// The accidental of the note.
	pub accidental: Accidental,

	/// Octave changing marks (if applicable).
	pub octave_change: OctaveChange,
}

impl Engravable for RelativePitch {
	fn engrave(&self) -> String {
		format!(
			"{}{}{}",
			self.name.engrave(),
			self.accidental.engrave(),
			self.octave_change.engrave()
		)
	}
}

/// Represents a pitch in absolute mode.
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct AbsolutePitch {
	/// The pitch of the note.
	pub name: PitchName,

	/// The accidental of the note.
	pub accidental: Accidental,

	/// The octave of the note.
	pub octave: u8,
}

impl Engravable for AbsolutePitch {
	fn engrave(&self) -> String {
		let octave_symbol = if self.octave >= 4 {
			"'".repeat((self.octave - 4) as usize)
		} else if self.octave < 3 {
			",".repeat((3 - self.octave) as usize)
		} else {
			"".to_string()
		};

		format!(
			"{}{}{}",
			self.name.engrave(),
			self.accidental.engrave(),
			octave_symbol
		)
	}
}

/// Represents the name of a note duration.
pub enum DurationName {
	/// A longa is a quadruple whole note.
	Longa,

	/// A breve is a double whole note.
	Breve,

	/// A semibreve is a whole note.
	Semibreve,

	/// A minim is a half note.
	Minim,

	/// A crotchet is a quarter note.
	Crotchet,

	/// A quaver is an eighth note.
	Quaver,

	/// A semiquaver is a sixteenth note.
	Semiquaver,

	/// A demisemiquaver is a thirty-second note.
	Demisemiquaver,

	/// A hemidemisemiquaver is a sixty-fourth note.
	Hemidemisemiquaver,
}

impl Engravable for DurationName {
	fn engrave(&self) -> String {
		match self {
			DurationName::Longa => "\\longa".to_string(),
			DurationName::Breve => "\\breve".to_string(),
			DurationName::Semibreve => "1".to_string(),
			DurationName::Minim => "2".to_string(),
			DurationName::Crotchet => "4".to_string(),
			DurationName::Quaver => "8".to_string(),
			DurationName::Semiquaver => "16".to_string(),
			DurationName::Demisemiquaver => "32".to_string(),
			DurationName::Hemidemisemiquaver => "64".to_string(),
		}
	}
}

/// Represents a dot in a dotted note, which augments the duration of the note.
pub enum Dot {
	/// No dot. 1.0x duration.
	None,

	/// Single dot. 1.5x duration.
	Single,

	/// Double dot. 1.75x duration.
	Double,

	/// Triple dot. 1.875x duration.
	Triple,
}

impl Engravable for Dot {
	fn engrave(&self) -> String {
		match self {
			Dot::None => "".to_string(),
			Dot::Single => ".".to_string(),
			Dot::Double => "..".to_string(),
			Dot::Triple => "...".to_string(),
		}
	}
}

/// Represents a note duration.
pub struct Duration {
	/// The name of the duration.
	pub name: DurationName,

	/// The dot of the note.
	pub dot: Dot,
}

impl Engravable for Duration {
	fn engrave(&self) -> String {
		format!("{}{}", self.name.engrave(), self.dot.engrave())
	}
}

struct RelativeNote {
	/// The pitch of the note.
	pitch: RelativePitch,

	/// The duration of the note.
	duration: Duration,

	/// Whether this note is tied to the next note.
	tie: bool,
}

impl Engravable for RelativeNote {
	fn engrave(&self) -> String {
		format!(
			"{}{}{}",
			self.pitch.engrave(),
			self.duration.engrave(),
			if self.tie { "~" } else { "" }
		)
	}
}

pub struct AbsoluteNote {
	/// The pitch of the note.
	pub pitch: AbsolutePitch,

	/// The duration of the note.
	pub duration: Duration,

	/// Whether this note is tied to the next note.
	pub tie: bool,
}

impl Engravable for AbsoluteNote {
	fn engrave(&self) -> String {
		format!(
			"{}{}{}",
			self.pitch.engrave(),
			self.duration.engrave(),
			if self.tie { "~" } else { "" }
		)
	}
}

/// Represents a rest.
struct Rest {
	/// The duration of the rest.
	duration: Duration,
}

impl Engravable for Rest {
	fn engrave(&self) -> String {
		format!("r{}", self.duration.engrave())
	}
}

/// Represents a pitch in a chord.
enum ChordPitch {
	Relative(RelativePitch),
	Absolute(AbsolutePitch),
}

impl From<RelativePitch> for ChordPitch {
	fn from(pitch: RelativePitch) -> Self {
		ChordPitch::Relative(pitch)
	}
}

impl From<AbsolutePitch> for ChordPitch {
	fn from(pitch: AbsolutePitch) -> Self {
		ChordPitch::Absolute(pitch)
	}
}

impl Engravable for ChordPitch {
	fn engrave(&self) -> String {
		match self {
			ChordPitch::Relative(pitch) => pitch.engrave(),
			ChordPitch::Absolute(pitch) => pitch.engrave(),
		}
	}
}

/// Represents a chord.
struct Chord {
	/// The pitches that make up the chord.
	pitches: Vec<ChordPitch>,

	/// The duration of the chord.
	duration: Duration,

	/// Whether this chord is tied to the next chord or note.
	tie: bool,
}

impl Engravable for Chord {
	fn engrave(&self) -> String {
		let pitches_string = self
			.pitches
			.iter()
			.map(|pitch| pitch.engrave())
			.collect::<Vec<String>>()
			.join(" ");

		format!(
			"<{}>{}{}",
			pitches_string,
			self.duration.engrave(),
			if self.tie { "~" } else { "" }
		)
	}
}

/// Represents an element within a tuplet.
enum TupletElement {
	RelativeNote(RelativeNote),
	AbsoluteNote(AbsoluteNote),
	Chord(Chord),
	Rest(Rest),
}

impl From<RelativeNote> for TupletElement {
	fn from(note: RelativeNote) -> Self {
		TupletElement::RelativeNote(note)
	}
}

impl From<AbsoluteNote> for TupletElement {
	fn from(note: AbsoluteNote) -> Self {
		TupletElement::AbsoluteNote(note)
	}
}

impl From<Chord> for TupletElement {
	fn from(chord: Chord) -> Self {
		TupletElement::Chord(chord)
	}
}

impl From<Rest> for TupletElement {
	fn from(rest: Rest) -> Self {
		TupletElement::Rest(rest)
	}
}

impl Engravable for TupletElement {
	fn engrave(&self) -> String {
		match self {
			TupletElement::RelativeNote(note) => note.engrave(),
			TupletElement::AbsoluteNote(note) => note.engrave(),
			TupletElement::Chord(chord) => chord.engrave(),
			TupletElement::Rest(rest) => rest.engrave(),
		}
	}
}

/// Represents a tuplet.
struct Tuplet {
	/// The numerator of the tuplet fraction.
	numerator: u8,

	/// The denominator of the tuplet fraction.
	denominator: u8,

	/// The musical elements within the tuplet.
	elements: Vec<TupletElement>,
}

impl Engravable for Tuplet {
	fn engrave(&self) -> String {
		let elements_string = self
			.elements
			.iter()
			.map(|element| element.engrave())
			.collect::<Vec<String>>()
			.join(" ");

		format!(
			"\\tuplet {}/{} {{ {} }}",
			self.numerator, self.denominator, elements_string
		)
	}
}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn test_pitch() {
		assert_eq!(PitchName::C.engrave(), "c");
		assert_eq!(PitchName::D.engrave(), "d");
		assert_eq!(PitchName::E.engrave(), "e");
		assert_eq!(PitchName::F.engrave(), "f");
		assert_eq!(PitchName::G.engrave(), "g");
		assert_eq!(PitchName::A.engrave(), "a");
		assert_eq!(PitchName::B.engrave(), "b");
	}

	#[test]
	fn test_pitch_step() {
		assert_eq!(PitchName::C.step(0), PitchName::C);
		assert_eq!(PitchName::C.step(1), PitchName::D);
		assert_eq!(PitchName::C.step(2), PitchName::E);
		assert_eq!(PitchName::C.step(3), PitchName::F);
		assert_eq!(PitchName::C.step(4), PitchName::G);
		assert_eq!(PitchName::C.step(5), PitchName::A);
		assert_eq!(PitchName::C.step(6), PitchName::B);
		assert_eq!(PitchName::C.step(7), PitchName::C);
		assert_eq!(PitchName::C.step(8), PitchName::D);
		assert_eq!(PitchName::C.step(9), PitchName::E);
		assert_eq!(PitchName::C.step(10), PitchName::F);
		assert_eq!(PitchName::C.step(11), PitchName::G);
		assert_eq!(PitchName::C.step(12), PitchName::A);
	}

	#[test]
	fn test_accidental() {
		assert_eq!(Accidental::DoubleFlat.engrave(), "eses");
		assert_eq!(Accidental::Flat.engrave(), "es");
		assert_eq!(Accidental::Natural.engrave(), "");
		assert_eq!(Accidental::Sharp.engrave(), "is");
		assert_eq!(Accidental::DoubleSharp.engrave(), "isis");
	}

	#[test]
	fn test_octave_change() {
		assert_eq!(OctaveChange::None.engrave(), "");
		assert_eq!(OctaveChange::Raise(0).engrave(), "");
		assert_eq!(OctaveChange::Raise(1).engrave(), "'");
		assert_eq!(OctaveChange::Raise(2).engrave(), "''");
		assert_eq!(OctaveChange::Lower(0).engrave(), "");
		assert_eq!(OctaveChange::Lower(1).engrave(), ",");
		assert_eq!(OctaveChange::Lower(2).engrave(), ",,");
	}

	#[test]
	fn test_duration_name() {
		assert_eq!(DurationName::Longa.engrave(), "\\longa");
		assert_eq!(DurationName::Breve.engrave(), "\\breve");
		assert_eq!(DurationName::Semibreve.engrave(), "1");
		assert_eq!(DurationName::Minim.engrave(), "2");
		assert_eq!(DurationName::Crotchet.engrave(), "4");
		assert_eq!(DurationName::Quaver.engrave(), "8");
		assert_eq!(DurationName::Semiquaver.engrave(), "16");
		assert_eq!(DurationName::Demisemiquaver.engrave(), "32");
		assert_eq!(DurationName::Hemidemisemiquaver.engrave(), "64");
	}

	#[test]
	fn test_dot() {
		assert_eq!(Dot::None.engrave(), "");
		assert_eq!(Dot::Single.engrave(), ".");
		assert_eq!(Dot::Double.engrave(), "..");
		assert_eq!(Dot::Triple.engrave(), "...");
	}

	#[test]
	fn test_duration() {
		assert_eq!(
			Duration {
				name: DurationName::Semibreve,
				dot: Dot::None,
			}
			.engrave(),
			"1"
		);

		assert_eq!(
			Duration {
				name: DurationName::Quaver,
				dot: Dot::Single,
			}
			.engrave(),
			"8."
		);

		assert_eq!(
			Duration {
				name: DurationName::Minim,
				dot: Dot::Double,
			}
			.engrave(),
			"2.."
		);

		assert_eq!(
			Duration {
				name: DurationName::Demisemiquaver,
				dot: Dot::Triple,
			}
			.engrave(),
			"32..."
		);
	}

	#[test]
	fn test_relative_note() {
		assert_eq!(
			RelativeNote {
				pitch: RelativePitch {
					name: PitchName::C,
					accidental: Accidental::Natural,
					octave_change: OctaveChange::None,
				},
				duration: Duration {
					name: DurationName::Semibreve,
					dot: Dot::None,
				},
				tie: false,
			}
			.engrave(),
			"c1"
		);

		assert_eq!(
			RelativeNote {
				pitch: RelativePitch {
					name: PitchName::D,
					accidental: Accidental::Sharp,
					octave_change: OctaveChange::Raise(1),
				},
				duration: Duration {
					name: DurationName::Quaver,
					dot: Dot::Single,
				},
				tie: true,
			}
			.engrave(),
			"dis'8.~"
		);

		assert_eq!(
			RelativeNote {
				pitch: RelativePitch {
					name: PitchName::E,
					accidental: Accidental::DoubleFlat,
					octave_change: OctaveChange::Lower(2),
				},
				duration: Duration {
					name: DurationName::Hemidemisemiquaver,
					dot: Dot::Triple,
				},
				tie: false,
			}
			.engrave(),
			"eeses,,64..."
		);
	}

	#[test]
	fn test_absolute_note() {
		assert_eq!(
			AbsoluteNote {
				pitch: AbsolutePitch {
					name: PitchName::F,
					accidental: Accidental::Flat,
					octave: 3,
				},
				duration: Duration {
					name: DurationName::Crotchet,
					dot: Dot::None,
				},
				tie: false,
			}
			.engrave(),
			"fes4"
		);

		assert_eq!(
			AbsoluteNote {
				pitch: AbsolutePitch {
					name: PitchName::G,
					accidental: Accidental::Natural,
					octave: 4,
				},
				duration: Duration {
					name: DurationName::Longa,
					dot: Dot::None,
				},
				tie: true,
			}
			.engrave(),
			"g\\longa~"
		);

		assert_eq!(
			AbsoluteNote {
				pitch: AbsolutePitch {
					name: PitchName::A,
					accidental: Accidental::DoubleSharp,
					octave: 6,
				},
				duration: Duration {
					name: DurationName::Semiquaver,
					dot: Dot::Single,
				},
				tie: false,
			}
			.engrave(),
			"aisis''16."
		);

		assert_eq!(
			AbsoluteNote {
				pitch: AbsolutePitch {
					name: PitchName::B,
					accidental: Accidental::Sharp,
					octave: 1,
				},
				duration: Duration {
					name: DurationName::Breve,
					dot: Dot::Double,
				},
				tie: false,
			}
			.engrave(),
			"bis,,\\breve.."
		);
	}

	#[test]
	fn test_rest() {
		assert_eq!(
			Rest {
				duration: Duration {
					name: DurationName::Semibreve,
					dot: Dot::None,
				},
			}
			.engrave(),
			"r1"
		);

		assert_eq!(
			Rest {
				duration: Duration {
					name: DurationName::Quaver,
					dot: Dot::Single,
				},
			}
			.engrave(),
			"r8."
		);

		assert_eq!(
			Rest {
				duration: Duration {
					name: DurationName::Demisemiquaver,
					dot: Dot::Triple,
				},
			}
			.engrave(),
			"r32..."
		);
	}

	#[test]
	fn test_chord() {
		assert_eq!(
			Chord {
				pitches: vec![
					RelativePitch {
						name: PitchName::C,
						accidental: Accidental::Natural,
						octave_change: OctaveChange::None,
					}
					.into(),
					RelativePitch {
						name: PitchName::E,
						accidental: Accidental::Sharp,
						octave_change: OctaveChange::Raise(1),
					}
					.into(),
					RelativePitch {
						name: PitchName::G,
						accidental: Accidental::Flat,
						octave_change: OctaveChange::Lower(2),
					}
					.into(),
				],
				duration: Duration {
					name: DurationName::Minim,
					dot: Dot::None,
				},
				tie: false,
			}
			.engrave(),
			"<c eis' ges,,>2"
		);

		assert_eq!(
			Chord {
				pitches: vec![
					AbsolutePitch {
						name: PitchName::A,
						accidental: Accidental::DoubleSharp,
						octave: 6,
					}
					.into(),
					AbsolutePitch {
						name: PitchName::B,
						accidental: Accidental::Sharp,
						octave: 1,
					}
					.into(),
					AbsolutePitch {
						name: PitchName::C,
						accidental: Accidental::Natural,
						octave: 4,
					}
					.into(),
				],
				duration: Duration {
					name: DurationName::Hemidemisemiquaver,
					dot: Dot::Triple,
				},
				tie: true,
			}
			.engrave(),
			"<aisis'' bis,, c>64...~"
		);
	}

	#[test]
	fn test_tuplet() {
		assert_eq!(
			Tuplet {
				numerator: 3,
				denominator: 2,
				elements: vec![
					Chord {
						pitches: vec![
							RelativePitch {
								name: PitchName::C,
								accidental: Accidental::Natural,
								octave_change: OctaveChange::None,
							}
							.into(),
							RelativePitch {
								name: PitchName::E,
								accidental: Accidental::Sharp,
								octave_change: OctaveChange::Raise(1),
							}
							.into(),
						],
						duration: Duration {
							name: DurationName::Crotchet,
							dot: Dot::None,
						},
						tie: false,
					}
					.into(),
					RelativeNote {
						pitch: RelativePitch {
							name: PitchName::D,
							accidental: Accidental::Sharp,
							octave_change: OctaveChange::Raise(1),
						},
						duration: Duration {
							name: DurationName::Crotchet,
							dot: Dot::None,
						},
						tie: true,
					}
					.into(),
					RelativeNote {
						pitch: RelativePitch {
							name: PitchName::D,
							accidental: Accidental::Sharp,
							octave_change: OctaveChange::None,
						},
						duration: Duration {
							name: DurationName::Crotchet,
							dot: Dot::None,
						},
						tie: false,
					}
					.into(),
				],
			}
			.engrave(),
			"\\tuplet 3/2 { <c eis'>4 dis'4~ dis4 }"
		);

		assert_eq!(
			Tuplet {
				numerator: 3,
				denominator: 2,
				elements: vec![
					AbsoluteNote {
						pitch: AbsolutePitch {
							name: PitchName::F,
							accidental: Accidental::Flat,
							octave: 3,
						},
						duration: Duration {
							name: DurationName::Quaver,
							dot: Dot::None,
						},
						tie: false,
					}
					.into(),
					Rest {
						duration: Duration {
							name: DurationName::Quaver,
							dot: Dot::None,
						},
					}
					.into(),
					AbsoluteNote {
						pitch: AbsolutePitch {
							name: PitchName::A,
							accidental: Accidental::DoubleSharp,
							octave: 6,
						},
						duration: Duration {
							name: DurationName::Quaver,
							dot: Dot::None,
						},
						tie: false,
					}
					.into(),
				],
			}
			.engrave(),
			"\\tuplet 3/2 { fes8 r8 aisis''8 }"
		);
	}
}
