use serde::{Deserialize, Serialize};
use typed_builder::TypedBuilder;

/// A partial representation of the JSON:API document format.
#[derive(Serialize, Deserialize)]
#[serde(untagged)]
pub enum Document<T> {
	/// A single resource object.
	Single { data: Option<ResourceObject<T>> },

	/// An array of resource objects.
	Multiple { data: Vec<ResourceObject<T>> },

	/// An array of errors.
	Error { errors: Vec<Error> },
}

/// A resource object.
#[derive(Serialize, Deserialize, TypedBuilder)]
pub struct ResourceObject<T> {
	/// A unique identifier for the resource object.
	#[builder(default, setter(strip_option))]
	pub id: Option<String>,

	/// Describes resource objects that share common attributes and relationships.
	pub r#type: String,

	/// Represents information about the resource object.
	pub attributes: T,
}

/// An error object.
#[derive(Serialize, Deserialize, TypedBuilder)]
pub struct Error {
	/// A unique identifier for this particular occurrence of the problem.
	#[serde(skip_serializing_if = "Option::is_none")]
	#[builder(default, setter(strip_option))]
	pub id: Option<String>,

	/// The HTTP status code applicable to this problem.
	#[serde(skip_serializing_if = "Option::is_none")]
	#[builder(default, setter(strip_option))]
	pub status: Option<String>,

	/// An application-specific error code.
	#[serde(skip_serializing_if = "Option::is_none")]
	#[builder(default, setter(strip_option))]
	pub code: Option<String>,

	/// A short, human-readable summary of the problem.
	#[serde(skip_serializing_if = "Option::is_none")]
	#[builder(default, setter(strip_option))]
	pub title: Option<String>,

	/// A human-readable explanation specific to this occurrence of the problem.
	#[serde(skip_serializing_if = "Option::is_none")]
	#[builder(default, setter(strip_option))]
	pub detail: Option<String>,
}
