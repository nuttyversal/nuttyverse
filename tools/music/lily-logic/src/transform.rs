use std::cmp::Ordering;

use crate::lily;
use crate::logic;

/// Represents an accidental type.
enum AccidentalType {
	Flat,
	Sharp,
	None,
}

/// Represents a key signature.
#[derive(Clone, Copy, Debug)]
enum KeySignature {
	/// C♭ major (♭♭♭♭♭♭♭).
	CFlatMajor,

	/// A♭ minor (♭♭♭♭♭♭♭).
	AFlatMinor,

	/// G♭ major (♭♭♭♭♭♭).
	GFlatMajor,

	/// E♭ minor (♭♭♭♭♭♭).
	EFlatMinor,

	/// D♭ major (♭♭♭♭♭).
	DFlatMajor,

	/// B♭ minor (♭♭♭♭♭).
	BFlatMinor,

	/// A♭ major (♭♭♭♭).
	ASharpMajor,

	/// F minor (♭♭♭♭).
	FMinor,

	/// E♭ major (♭♭♭).
	EFlatMajor,

	/// C minor (♭♭♭).
	CMinor,

	/// B♭ major (♭♭).
	BFlatMajor,

	/// G minor (♭♭).
	GMinor,

	/// F major (♭).
	FMajor,

	/// D minor (♭).
	DMinor,

	/// C major.
	CMajor,

	/// A minor.
	AMinor,

	/// G major (♯).
	GMajor,

	/// E minor (♯).
	EMinor,

	/// D major (♯♯).
	DMajor,

	/// B minor (♯♯).
	BMinor,

	/// A major (♯♯♯).
	AMajor,

	/// F♯ minor (♯♯♯).
	FSharpMinor,

	/// E major (♯♯♯♯).
	EMajor,

	/// C♯ minor (♯♯♯♯).
	CSharpMinor,

	/// B major (♯♯♯♯♯).
	BMajor,

	/// G♯ minor (♯♯♯♯♯).
	GSharpMinor,

	/// F♯ major (♯♯♯♯♯♯).
	FSharpMajor,

	/// D♯ minor (♯♯♯♯♯♯).
	DSharpMinor,

	/// C♯ major (♯♯♯♯♯♯♯).
	CSharpMajor,

	/// A♯ minor (♯♯♯♯♯♯♯).
	ASharpMinor,
}

impl KeySignature {
	/// Returns the accidental type of the key signature.
	fn accidental_type(&self) -> AccidentalType {
		match self {
			KeySignature::CMajor | KeySignature::AMinor => AccidentalType::None,

			KeySignature::CFlatMajor
			| KeySignature::AFlatMinor
			| KeySignature::GFlatMajor
			| KeySignature::EFlatMinor
			| KeySignature::DFlatMajor
			| KeySignature::BFlatMinor
			| KeySignature::ASharpMajor
			| KeySignature::FMinor
			| KeySignature::EFlatMajor
			| KeySignature::CMinor
			| KeySignature::BFlatMajor
			| KeySignature::GMinor
			| KeySignature::FMajor
			| KeySignature::DMinor => AccidentalType::Flat,

			KeySignature::GMajor
			| KeySignature::EMinor
			| KeySignature::DMajor
			| KeySignature::BMinor
			| KeySignature::AMajor
			| KeySignature::FSharpMinor
			| KeySignature::EMajor
			| KeySignature::CSharpMinor
			| KeySignature::BMajor
			| KeySignature::GSharpMinor
			| KeySignature::FSharpMajor
			| KeySignature::DSharpMinor
			| KeySignature::CSharpMajor
			| KeySignature::ASharpMinor => AccidentalType::Sharp,
		}
	}

	/// Returns the number of accidentals in the key signature.
	fn accidental_count(&self) -> usize {
		match self {
			KeySignature::CFlatMajor | KeySignature::AFlatMinor => 7,
			KeySignature::GFlatMajor | KeySignature::EFlatMinor => 6,
			KeySignature::DFlatMajor | KeySignature::BFlatMinor => 5,
			KeySignature::ASharpMajor | KeySignature::FMinor => 4,
			KeySignature::EFlatMajor | KeySignature::CMinor => 3,
			KeySignature::BFlatMajor | KeySignature::GMinor => 2,
			KeySignature::FMajor | KeySignature::DMinor => 1,
			KeySignature::CMajor | KeySignature::AMinor => 0,
			KeySignature::GMajor | KeySignature::EMinor => 1,
			KeySignature::DMajor | KeySignature::BMinor => 2,
			KeySignature::AMajor | KeySignature::FSharpMinor => 3,
			KeySignature::EMajor | KeySignature::CSharpMinor => 4,
			KeySignature::BMajor | KeySignature::GSharpMinor => 5,
			KeySignature::FSharpMajor | KeySignature::DSharpMinor => 6,
			KeySignature::CSharpMajor | KeySignature::ASharpMinor => 7,
		}
	}

	/// Returns the accidental pitches in the key signature.
	fn accidental_pitches(&self) -> Vec<(lily::PitchName, lily::Accidental)> {
		let sharps = [
			(lily::PitchName::F, lily::Accidental::Sharp),
			(lily::PitchName::C, lily::Accidental::Sharp),
			(lily::PitchName::G, lily::Accidental::Sharp),
			(lily::PitchName::D, lily::Accidental::Sharp),
			(lily::PitchName::A, lily::Accidental::Sharp),
			(lily::PitchName::E, lily::Accidental::Sharp),
			(lily::PitchName::B, lily::Accidental::Sharp),
		];

		let flats = [
			(lily::PitchName::B, lily::Accidental::Flat),
			(lily::PitchName::E, lily::Accidental::Flat),
			(lily::PitchName::A, lily::Accidental::Flat),
			(lily::PitchName::D, lily::Accidental::Flat),
			(lily::PitchName::G, lily::Accidental::Flat),
			(lily::PitchName::C, lily::Accidental::Flat),
			(lily::PitchName::F, lily::Accidental::Flat),
		];

		match self.accidental_type() {
			AccidentalType::Sharp => sharps[..self.accidental_count()].to_vec(),
			AccidentalType::Flat => flats[..self.accidental_count()].to_vec(),
			AccidentalType::None => Vec::new(),
		}
	}

	/// Returns the pitches in the key's natural scale.
	fn natural_scale_pitches(&self) -> Vec<(lily::PitchName, lily::Accidental)> {
		let tonic = match self {
			KeySignature::AFlatMinor => lily::PitchName::A,
			KeySignature::AMajor => lily::PitchName::A,
			KeySignature::AMinor => lily::PitchName::A,
			KeySignature::ASharpMajor => lily::PitchName::A,
			KeySignature::ASharpMinor => lily::PitchName::A,
			KeySignature::BFlatMajor => lily::PitchName::B,
			KeySignature::BFlatMinor => lily::PitchName::B,
			KeySignature::BMajor => lily::PitchName::B,
			KeySignature::BMinor => lily::PitchName::B,
			KeySignature::CFlatMajor => lily::PitchName::C,
			KeySignature::CMajor => lily::PitchName::C,
			KeySignature::CMinor => lily::PitchName::C,
			KeySignature::CSharpMajor => lily::PitchName::C,
			KeySignature::CSharpMinor => lily::PitchName::C,
			KeySignature::DFlatMajor => lily::PitchName::D,
			KeySignature::DMajor => lily::PitchName::D,
			KeySignature::DMinor => lily::PitchName::D,
			KeySignature::DSharpMinor => lily::PitchName::D,
			KeySignature::EFlatMajor => lily::PitchName::E,
			KeySignature::EFlatMinor => lily::PitchName::E,
			KeySignature::EMajor => lily::PitchName::E,
			KeySignature::EMinor => lily::PitchName::E,
			KeySignature::FMajor => lily::PitchName::F,
			KeySignature::FMinor => lily::PitchName::F,
			KeySignature::FSharpMajor => lily::PitchName::F,
			KeySignature::FSharpMinor => lily::PitchName::F,
			KeySignature::GFlatMajor => lily::PitchName::G,
			KeySignature::GMajor => lily::PitchName::G,
			KeySignature::GMinor => lily::PitchName::G,
			KeySignature::GSharpMinor => lily::PitchName::G,
		};

		(0..7)
			.map(|step| {
				let accidentals = self.accidental_pitches();
				let pitch = tonic.step(step);

				// Is the pitch in the key signature?
				let accidental = if accidentals.contains(&(pitch, lily::Accidental::Sharp)) {
					// Yes.
					lily::Accidental::Sharp
				} else if accidentals.contains(&(pitch, lily::Accidental::Flat)) {
					// Yes.
					lily::Accidental::Flat
				} else {
					// No.
					lily::Accidental::Natural
				};

				(pitch, accidental)
			})
			.collect()
	}
}

/// Represents a time signature.
#[derive(Clone, Copy, Debug)]
struct TimeSignature {
	/// The number of beats in a bar.
	numerator: u8,

	/// The note value that represents one beat.
	denominator: u8,
}

impl TimeSignature {
	/// Returns the length of a time in ticks.
	fn length_ticks(&self, time: logic::Time) -> u32 {
		let bar_ticks = time.bar as u32 * self.bar_duration();
		let beat_ticks = time.beat as u32 * self.beat_duration();
		let division_ticks = time.division as u32 * self.division_duration();
		let tick_ticks = time.ticks as u32;

		bar_ticks + beat_ticks + division_ticks + tick_ticks
	}

	/// Returns the position of a time in ticks.
	fn position_ticks(&self, time: logic::Time) -> u32 {
		// The position in an event uses one-based indexing.
		// The result will use zero-based indexing.
		let bar_ticks = (time.bar as u32 - 1) * self.bar_duration();
		let beat_ticks = (time.beat as u32 - 1) * self.beat_duration();
		let division_ticks = (time.division as u32 - 1) * self.division_duration();
		let tick_ticks = (time.ticks - 1) as u32;

		bar_ticks + beat_ticks + division_ticks + tick_ticks
	}

	/// Returns the duration of a beat in ticks.
	fn beat_duration(&self) -> u32 {
		// Pulses per quarter note.
		let ppqn = 960;

		// The duration of a whole note in ticks.
		let whole_note_duration = ppqn * 4;

		// The duration of a beat in ticks.
		whole_note_duration / self.denominator as u32
	}

	/// Returns the duration of a bar in ticks.
	fn bar_duration(&self) -> u32 {
		self.beat_duration() * self.numerator as u32
	}

	/// Returns the duration of a division in ticks.
	fn division_duration(&self) -> u32 {
		// Each subdivision is a sixteenth note.
		240
	}
}

/// Represents a note in a sequence. This is an intermediate representation that
/// is used to transform Logic Pro events to LilyPond notes while preserving the
/// timing information from the event.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
struct SequencedNote {
	/// The note that the event represents.
	pitch: lily::AbsolutePitch,

	/// The position of the event in the sequence (in ticks).
	position: u32,

	/// The length of the event in the sequence (in ticks).
	length: u32,
}

impl PartialOrd for SequencedNote {
	fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
		Some(self.cmp(other))
	}
}

impl Ord for SequencedNote {
	fn cmp(&self, other: &Self) -> std::cmp::Ordering {
		self
			.position
			.cmp(&other.position)
			.then(self.length.cmp(&other.length))
			.then(self.pitch.cmp(&other.pitch))
	}
}

/// Represents a chord in a sequence. This is an intermediate representation that
/// is used to cluster Logic Pro events to LilyPond chords while preserving the
/// timing information from the events.
#[derive(Clone, Debug, PartialEq, Eq)]
struct SequencedChord {
	/// The pitches of the notes in the chord.
	pitches: Vec<lily::AbsolutePitch>,

	/// The position of the chord in the sequence (in ticks).
	position: u32,

	/// The length of the chord in the sequence (in ticks).
	length: u32,
}

impl SequencedChord {
	fn new(notes: &[&SequencedNote]) -> Self {
		let pitches = notes.iter().map(|note| note.pitch).collect();

		// Use the position of the first note for the chord position.
		let position = notes[0].position;

		// For length, use the longest note duration in the chord.
		let length = notes
			.iter()
			.map(|note| note.length)
			.max()
			// Invariant: There are at least two notes in the chord.
			// Therefore, the max() call will always return Some.
			// But if it doesn't, we use the position as the length.
			.unwrap_or(position);

		SequencedChord {
			pitches,
			position,
			length,
		}
	}
}

impl PartialOrd for SequencedChord {
	fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
		Some(self.cmp(other))
	}
}

impl Ord for SequencedChord {
	fn cmp(&self, other: &Self) -> std::cmp::Ordering {
		self
			.position
			.cmp(&other.position)
			.then(self.length.cmp(&other.length))
			.then(self.pitches.cmp(&other.pitches))
	}
}

/// Represents a rest in a sequence. This is an intermediate representation that
/// is used to keep track of gaps between notes and chords.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
struct SequencedRest {
	/// The position of the rest in the sequence (in ticks).
	position: u32,

	/// The length of the rest in the sequence (in ticks).
	length: u32,
}

impl PartialOrd for SequencedRest {
	fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
		Some(self.cmp(other))
	}
}

impl Ord for SequencedRest {
	fn cmp(&self, other: &Self) -> std::cmp::Ordering {
		self
			.position
			.cmp(&other.position)
			.then(self.length.cmp(&other.length))
	}
}

/// Represents an element in a sequence.
#[derive(Clone, Debug)]
enum SequencedElement {
	Note(SequencedNote),
	Chord(SequencedChord),
	Rest(SequencedRest),
}

impl SequencedElement {
	/// Returns the position of the element.
	fn position(&self) -> u32 {
		match self {
			SequencedElement::Note(note) => note.position,
			SequencedElement::Chord(chord) => chord.position,
			SequencedElement::Rest(rest) => rest.position,
		}
	}

	/// Returns the length of the element.
	fn length(&self) -> u32 {
		match self {
			SequencedElement::Note(note) => note.length,
			SequencedElement::Chord(chord) => chord.length,
			SequencedElement::Rest(rest) => rest.length,
		}
	}
}

impl PartialEq for SequencedElement {
	fn eq(&self, other: &Self) -> bool {
		self.position() == other.position() && self.length() == other.length()
	}
}

impl Eq for SequencedElement {}

impl PartialOrd for SequencedElement {
	fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
		Some(self.cmp(other))
	}
}

impl Ord for SequencedElement {
	fn cmp(&self, other: &Self) -> Ordering {
		self
			.position()
			.cmp(&other.position())
			.then_with(|| self.length().cmp(&other.length()))
	}
}

impl From<SequencedNote> for SequencedElement {
	fn from(note: SequencedNote) -> Self {
		SequencedElement::Note(note)
	}
}

impl From<SequencedChord> for SequencedElement {
	fn from(chord: SequencedChord) -> Self {
		SequencedElement::Chord(chord)
	}
}

impl From<SequencedRest> for SequencedElement {
	fn from(rest: SequencedRest) -> Self {
		SequencedElement::Rest(rest)
	}
}

/// Represents the context of a transformation.
#[derive(Clone, Copy, Debug)]
struct TransformContext {
	/// The key signature of the sequence.
	key_signature: KeySignature,

	/// The time signature of the sequence.
	time_signature: TimeSignature,
}

/// Transforms a pitch from a Logic Pro event to a LilyPond pitch.
fn transform_pitch(pitch: logic::Pitch, octave: u8) -> lily::AbsolutePitch {
	let (name, accidental) = match pitch {
		logic::Pitch::C => (lily::PitchName::C, lily::Accidental::Natural),
		logic::Pitch::Cis => (lily::PitchName::C, lily::Accidental::Sharp),
		logic::Pitch::D => (lily::PitchName::D, lily::Accidental::Natural),
		logic::Pitch::Dis => (lily::PitchName::D, lily::Accidental::Sharp),
		logic::Pitch::E => (lily::PitchName::E, lily::Accidental::Natural),
		logic::Pitch::F => (lily::PitchName::F, lily::Accidental::Natural),
		logic::Pitch::Fis => (lily::PitchName::F, lily::Accidental::Sharp),
		logic::Pitch::G => (lily::PitchName::G, lily::Accidental::Natural),
		logic::Pitch::Gis => (lily::PitchName::G, lily::Accidental::Sharp),
		logic::Pitch::A => (lily::PitchName::A, lily::Accidental::Natural),
		logic::Pitch::Ais => (lily::PitchName::A, lily::Accidental::Sharp),
		logic::Pitch::B => (lily::PitchName::B, lily::Accidental::Natural),
	};

	lily::AbsolutePitch {
		name,
		accidental,
		octave,
	}
}

/// Transforms a pitch spelling based on the key signature.
fn transform_spelling(
	pitch: lily::AbsolutePitch,
	context: TransformContext,
) -> lily::AbsolutePitch {
	let enharmonic_pitch = match pitch {
		// C♯ is enharmonic to D♭.
		lily::AbsolutePitch {
			name: lily::PitchName::C,
			accidental: lily::Accidental::Sharp,
			octave,
		} => lily::AbsolutePitch {
			name: lily::PitchName::D,
			accidental: lily::Accidental::Flat,
			octave,
		},

		// D♭ is enharmonic to C♯.
		lily::AbsolutePitch {
			name: lily::PitchName::D,
			accidental: lily::Accidental::Flat,
			octave,
		} => lily::AbsolutePitch {
			name: lily::PitchName::C,
			accidental: lily::Accidental::Sharp,
			octave,
		},

		// D♯ is enharmonic to E♭.
		lily::AbsolutePitch {
			name: lily::PitchName::D,
			accidental: lily::Accidental::Sharp,
			octave,
		} => lily::AbsolutePitch {
			name: lily::PitchName::E,
			accidental: lily::Accidental::Flat,
			octave,
		},

		// E♭ is enharmonic to D♯.
		lily::AbsolutePitch {
			name: lily::PitchName::E,
			accidental: lily::Accidental::Flat,
			octave,
		} => lily::AbsolutePitch {
			name: lily::PitchName::D,
			accidental: lily::Accidental::Sharp,
			octave,
		},

		// F♯ is enharmonic to G♭.
		lily::AbsolutePitch {
			name: lily::PitchName::F,
			accidental: lily::Accidental::Sharp,
			octave,
		} => lily::AbsolutePitch {
			name: lily::PitchName::G,
			accidental: lily::Accidental::Flat,
			octave,
		},

		// G♭ is enharmonic to F♯.
		lily::AbsolutePitch {
			name: lily::PitchName::G,
			accidental: lily::Accidental::Flat,
			octave,
		} => lily::AbsolutePitch {
			name: lily::PitchName::F,
			accidental: lily::Accidental::Sharp,
			octave,
		},

		// G♯ is enharmonic to A♭.
		lily::AbsolutePitch {
			name: lily::PitchName::G,
			accidental: lily::Accidental::Sharp,
			octave,
		} => lily::AbsolutePitch {
			name: lily::PitchName::A,
			accidental: lily::Accidental::Flat,
			octave,
		},

		// A♭ is enharmonic to G♯.
		lily::AbsolutePitch {
			name: lily::PitchName::A,
			accidental: lily::Accidental::Flat,
			octave,
		} => lily::AbsolutePitch {
			name: lily::PitchName::G,
			accidental: lily::Accidental::Sharp,
			octave,
		},

		// A♯ is enharmonic to B♭.
		lily::AbsolutePitch {
			name: lily::PitchName::A,
			accidental: lily::Accidental::Sharp,
			octave,
		} => lily::AbsolutePitch {
			name: lily::PitchName::B,
			accidental: lily::Accidental::Flat,
			octave,
		},

		// B♭ is enharmonic to A♯.
		lily::AbsolutePitch {
			name: lily::PitchName::B,
			accidental: lily::Accidental::Flat,
			octave,
		} => lily::AbsolutePitch {
			name: lily::PitchName::A,
			accidental: lily::Accidental::Sharp,
			octave,
		},

		// B is enharmonic to C♭.
		lily::AbsolutePitch {
			name: lily::PitchName::B,
			accidental: lily::Accidental::Natural,
			octave,
		} => lily::AbsolutePitch {
			name: lily::PitchName::C,
			accidental: lily::Accidental::Flat,
			octave: octave + 1,
		},

		// C♭ is enharmonic to B.
		lily::AbsolutePitch {
			name: lily::PitchName::C,
			accidental: lily::Accidental::Flat,
			octave,
		} => lily::AbsolutePitch {
			name: lily::PitchName::B,
			accidental: lily::Accidental::Natural,
			octave: octave - 1,
		},

		// E is enharmonic to F♭.
		lily::AbsolutePitch {
			name: lily::PitchName::E,
			accidental: lily::Accidental::Natural,
			octave,
		} => lily::AbsolutePitch {
			name: lily::PitchName::F,
			accidental: lily::Accidental::Flat,
			octave,
		},

		// F♭ is enharmonic to E.
		lily::AbsolutePitch {
			name: lily::PitchName::F,
			accidental: lily::Accidental::Flat,
			octave,
		} => lily::AbsolutePitch {
			name: lily::PitchName::E,
			accidental: lily::Accidental::Natural,
			octave,
		},

		_ => pitch.clone(),
	};

	if context
		.key_signature
		.natural_scale_pitches()
		.contains(&(enharmonic_pitch.name, enharmonic_pitch.accidental))
	{
		enharmonic_pitch
	} else {
		pitch
	}
}

/// Transforms a Logic Pro event to a sequenced note.
fn sequence_event(event: logic::Event, context: TransformContext) -> SequencedNote {
	let pitch = transform_pitch(event.note.pitch, event.note.octave);
	let pitch = transform_spelling(pitch, context);

	SequencedNote {
		pitch,
		position: context.time_signature.position_ticks(event.position),
		length: context.time_signature.length_ticks(event.length),
	}
}

/// Transforms a list of Logic Pro events to a list of sequenced notes.
fn sequence_events(events: Vec<logic::Event>, context: TransformContext) -> Vec<SequencedNote> {
	let mut sequenced_notes: Vec<SequencedNote> = events
		.into_iter()
		.map(|event| sequence_event(event, context))
		.collect();

	sequenced_notes.sort();
	sequenced_notes
}

/// Identifies chords in a list of sequenced notes. Notes that are part
/// of a chord are clustered together and returned as a sequenced chord.
/// Notes that are *not* part of a chord are returned as single notes.
fn identify_chords(notes: Vec<SequencedNote>) -> Vec<SequencedElement> {
	let mut elements = Vec::new();
	let mut current_chord_notes = Vec::new();

	for (i, note) in notes.iter().enumerate() {
		if i == 0 || note.position == notes[i - 1].position {
			// Add the note to the current (candidate) chord.
			current_chord_notes.push(note);
		} else {
			// Process the accumulated notes
			if current_chord_notes.len() >= 2 {
				elements.push(SequencedChord::new(current_chord_notes.as_slice()).into());
			} else {
				// Add single notes to the elements vector.
				elements.extend(current_chord_notes.iter().map(|&note| (*note).into()));
			}

			// Start a new (candidate) chord.
			current_chord_notes.clear();
			current_chord_notes.push(note);
		}
	}

	// Process the last group of notes.
	if current_chord_notes.len() >= 2 {
		elements.push(SequencedChord::new(current_chord_notes.as_slice()).into());
	} else {
		elements.extend(
			current_chord_notes
				.iter()
				.map(|&note| SequencedElement::Note(*note)),
		);
	}

	elements.sort();
	elements
}

/// Identifies rests in a list of sequenced elements. Rests are inserted
/// between notes and chords to fill gaps in the sequence.
fn identify_rests(
	elements: Vec<SequencedElement>,
	context: &TransformContext,
) -> Vec<SequencedElement> {
	if elements.is_empty() {
		return vec![];
	}

	let mut new_elements = Vec::new();
	let mut current_position = 0;
	let ticks_per_bar = context.time_signature.bar_duration();

	for element in elements.iter() {
		// If there is a gap, then insert a rest.
		if element.position() > current_position {
			new_elements.push(
				SequencedRest {
					position: current_position,
					length: element.position() - current_position,
				}
				.into(),
			);
		}

		new_elements.push(element.clone());
		current_position = element.position() + element.length();
	}

	// Do we need to insert a rest at the end?
	if current_position % ticks_per_bar != 0 {
		let rest_length = ticks_per_bar - (current_position % ticks_per_bar);

		new_elements.push(
			SequencedRest {
				position: current_position,
				length: rest_length,
			}
			.into(),
		);
	}

	new_elements
}

/// The transformation pipeline.
fn transform(events: Vec<logic::Event>, context: TransformContext) -> () {
	let notes = sequence_events(events, context);
	let elements = identify_chords(notes);
	let elements = identify_rests(elements, &context);

	todo!("Identify rests from gaps between notes and chords.")
}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn test_accidental_pitches() {
		assert_eq!(
			KeySignature::CFlatMajor.accidental_pitches(),
			vec![
				(lily::PitchName::B, lily::Accidental::Flat),
				(lily::PitchName::E, lily::Accidental::Flat),
				(lily::PitchName::A, lily::Accidental::Flat),
				(lily::PitchName::D, lily::Accidental::Flat),
				(lily::PitchName::G, lily::Accidental::Flat),
				(lily::PitchName::C, lily::Accidental::Flat),
				(lily::PitchName::F, lily::Accidental::Flat),
			]
		);

		assert_eq!(
			KeySignature::AMajor.accidental_pitches(),
			vec![
				(lily::PitchName::F, lily::Accidental::Sharp),
				(lily::PitchName::C, lily::Accidental::Sharp),
				(lily::PitchName::G, lily::Accidental::Sharp),
			]
		);

		assert_eq!(
			KeySignature::GSharpMinor.accidental_pitches(),
			vec![
				(lily::PitchName::F, lily::Accidental::Sharp),
				(lily::PitchName::C, lily::Accidental::Sharp),
				(lily::PitchName::G, lily::Accidental::Sharp),
				(lily::PitchName::D, lily::Accidental::Sharp),
				(lily::PitchName::A, lily::Accidental::Sharp),
			]
		);
	}

	#[test]
	fn test_natural_scale_pitches() {
		assert_eq!(
			KeySignature::CFlatMajor.natural_scale_pitches(),
			vec![
				(lily::PitchName::C, lily::Accidental::Flat),
				(lily::PitchName::D, lily::Accidental::Flat),
				(lily::PitchName::E, lily::Accidental::Flat),
				(lily::PitchName::F, lily::Accidental::Flat),
				(lily::PitchName::G, lily::Accidental::Flat),
				(lily::PitchName::A, lily::Accidental::Flat),
				(lily::PitchName::B, lily::Accidental::Flat),
			]
		);

		assert_eq!(
			KeySignature::AMajor.natural_scale_pitches(),
			vec![
				(lily::PitchName::A, lily::Accidental::Natural),
				(lily::PitchName::B, lily::Accidental::Natural),
				(lily::PitchName::C, lily::Accidental::Sharp),
				(lily::PitchName::D, lily::Accidental::Natural),
				(lily::PitchName::E, lily::Accidental::Natural),
				(lily::PitchName::F, lily::Accidental::Sharp),
				(lily::PitchName::G, lily::Accidental::Sharp),
			]
		);
	}

	#[test]
	fn test_transform_pitch() {
		assert_eq!(
			transform_pitch(logic::Pitch::C, 4),
			lily::AbsolutePitch {
				name: lily::PitchName::C,
				accidental: lily::Accidental::Natural,
				octave: 4
			}
		);

		assert_eq!(
			transform_pitch(logic::Pitch::Cis, 5),
			lily::AbsolutePitch {
				name: lily::PitchName::C,
				accidental: lily::Accidental::Sharp,
				octave: 5
			}
		);

		assert_eq!(
			transform_pitch(logic::Pitch::D, 3),
			lily::AbsolutePitch {
				name: lily::PitchName::D,
				accidental: lily::Accidental::Natural,
				octave: 3
			}
		);

		assert_eq!(
			transform_pitch(logic::Pitch::Dis, 4),
			lily::AbsolutePitch {
				name: lily::PitchName::D,
				accidental: lily::Accidental::Sharp,
				octave: 4
			}
		);

		assert_eq!(
			transform_pitch(logic::Pitch::E, 2),
			lily::AbsolutePitch {
				name: lily::PitchName::E,
				accidental: lily::Accidental::Natural,
				octave: 2
			}
		);

		assert_eq!(
			transform_pitch(logic::Pitch::F, 3),
			lily::AbsolutePitch {
				name: lily::PitchName::F,
				accidental: lily::Accidental::Natural,
				octave: 3
			}
		);

		assert_eq!(
			transform_pitch(logic::Pitch::Fis, 4),
			lily::AbsolutePitch {
				name: lily::PitchName::F,
				accidental: lily::Accidental::Sharp,
				octave: 4
			}
		);

		assert_eq!(
			transform_pitch(logic::Pitch::G, 7),
			lily::AbsolutePitch {
				name: lily::PitchName::G,
				accidental: lily::Accidental::Natural,
				octave: 7
			}
		);

		assert_eq!(
			transform_pitch(logic::Pitch::Gis, 3),
			lily::AbsolutePitch {
				name: lily::PitchName::G,
				accidental: lily::Accidental::Sharp,
				octave: 3
			}
		);

		assert_eq!(
			transform_pitch(logic::Pitch::A, 2),
			lily::AbsolutePitch {
				name: lily::PitchName::A,
				accidental: lily::Accidental::Natural,
				octave: 2
			}
		);

		assert_eq!(
			transform_pitch(logic::Pitch::Ais, 3),
			lily::AbsolutePitch {
				name: lily::PitchName::A,
				accidental: lily::Accidental::Sharp,
				octave: 3
			}
		);

		assert_eq!(
			transform_pitch(logic::Pitch::B, 2),
			lily::AbsolutePitch {
				name: lily::PitchName::B,
				accidental: lily::Accidental::Natural,
				octave: 2
			}
		);
	}

	#[test]
	fn test_transform_spelling() {
		let context = TransformContext {
			key_signature: KeySignature::BMajor,
			time_signature: TimeSignature {
				numerator: 4,
				denominator: 4,
			},
		};

		assert_eq!(
			transform_spelling(
				lily::AbsolutePitch {
					name: lily::PitchName::C,
					accidental: lily::Accidental::Sharp,
					octave: 4
				},
				context
			),
			lily::AbsolutePitch {
				name: lily::PitchName::C,
				accidental: lily::Accidental::Sharp,
				octave: 4
			}
		);

		assert_eq!(
			transform_spelling(
				lily::AbsolutePitch {
					name: lily::PitchName::C,
					accidental: lily::Accidental::Flat,
					octave: 4
				},
				context
			),
			lily::AbsolutePitch {
				name: lily::PitchName::B,
				accidental: lily::Accidental::Natural,
				octave: 3
			}
		);

		let context = TransformContext {
			key_signature: KeySignature::CFlatMajor,
			time_signature: TimeSignature {
				numerator: 4,
				denominator: 4,
			},
		};

		assert_eq!(
			transform_spelling(
				lily::AbsolutePitch {
					name: lily::PitchName::B,
					accidental: lily::Accidental::Natural,
					octave: 4
				},
				context
			),
			lily::AbsolutePitch {
				name: lily::PitchName::C,
				accidental: lily::Accidental::Flat,
				octave: 5
			}
		);
	}

	#[test]
	fn test_sequenced_element_ordering() {
		let note1 = SequencedElement::Note(SequencedNote {
			pitch: lily::AbsolutePitch {
				name: lily::PitchName::C,
				accidental: lily::Accidental::Natural,
				octave: 4,
			},
			position: 0,
			length: 480,
		});

		let note2 = SequencedElement::Note(SequencedNote {
			pitch: lily::AbsolutePitch {
				name: lily::PitchName::D,
				accidental: lily::Accidental::Natural,
				octave: 4,
			},
			position: 0,
			length: 960,
		});

		let note3 = SequencedElement::Note(SequencedNote {
			pitch: lily::AbsolutePitch {
				name: lily::PitchName::E,
				accidental: lily::Accidental::Natural,
				octave: 4,
			},
			position: 480,
			length: 480,
		});

		assert!(note1 < note2); // Same position, but note2 is longer
		assert!(note1 < note3); // note3 starts later
		assert!(note2 < note3); // note3 starts later

		let mut elements = vec![note3.clone(), note1.clone(), note2.clone()];
		elements.sort();

		assert_eq!(elements, vec![note1, note2, note3]);
	}

	#[test]
	fn test_identify_chords() {
		let notes = vec![
			SequencedNote {
				pitch: lily::AbsolutePitch {
					name: lily::PitchName::C,
					accidental: lily::Accidental::Natural,
					octave: 4,
				},
				position: 960,
				length: 960,
			},
			SequencedNote {
				pitch: lily::AbsolutePitch {
					name: lily::PitchName::C,
					accidental: lily::Accidental::Natural,
					octave: 4,
				},
				position: 0,
				length: 960,
			},
			SequencedNote {
				pitch: lily::AbsolutePitch {
					name: lily::PitchName::E,
					accidental: lily::Accidental::Natural,
					octave: 4,
				},
				position: 0,
				length: 960,
			},
			SequencedNote {
				pitch: lily::AbsolutePitch {
					name: lily::PitchName::G,
					accidental: lily::Accidental::Natural,
					octave: 4,
				},
				position: 0,
				length: 960,
			},
			SequencedNote {
				pitch: lily::AbsolutePitch {
					name: lily::PitchName::C,
					accidental: lily::Accidental::Natural,
					octave: 4,
				},
				position: 960,
				length: 960,
			},
		];

		let elements = identify_chords(notes);

		let single_notes: Vec<_> = elements
			.iter()
			.filter_map(|e| {
				if let SequencedElement::Note(n) = e {
					Some(n)
				} else {
					None
				}
			})
			.collect();

		let chords: Vec<_> = elements
			.iter()
			.filter_map(|e| {
				if let SequencedElement::Chord(c) = e {
					Some(c)
				} else {
					None
				}
			})
			.collect();

		assert_eq!(single_notes.len(), 2);
		assert_eq!(chords.len(), 1);
	}

	#[test]
	fn test_identify_rests() {
		let context = TransformContext {
			key_signature: KeySignature::CMajor,
			time_signature: TimeSignature {
				numerator: 4,
				denominator: 4,
			},
		};

		let ticks_per_bar = 3840;
		assert_eq!(context.time_signature.bar_duration(), ticks_per_bar);

		let elements = vec![
			SequencedNote {
				pitch: lily::AbsolutePitch {
					name: lily::PitchName::C,
					accidental: lily::Accidental::Natural,
					octave: 4,
				},
				// Eighth note.
				position: 0,
				length: 480,
			}
			.into(),
			SequencedNote {
				pitch: lily::AbsolutePitch {
					name: lily::PitchName::E,
					accidental: lily::Accidental::Natural,
					octave: 4,
				},
				// Quarter note.
				position: 960,
				length: 960,
			}
			.into(),
		];

		let elements = identify_rests(elements, &context);

		assert_eq!(elements.len(), 4);

		match &elements[1] {
			SequencedElement::Rest(rest) => {
				assert_eq!(rest.position, 480);
				assert_eq!(rest.length, 480);
			}
			_ => panic!("Expected a rest at index 1"),
		}

		match &elements[3] {
			SequencedElement::Rest(rest) => {
				assert_eq!(rest.position, 1920);
				assert_eq!(rest.length, 1920);
			}
			_ => panic!("Expected a rest at index 3"),
		}
	}
}
