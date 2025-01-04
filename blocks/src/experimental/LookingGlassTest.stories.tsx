import type { Meta } from "@storybook/react";

const meta: Meta = {
	title: "experimental/LookingGlassUpload",
	tags: ["autodocs"],
};

export default meta;

export const Component = {
	render: () => (
		<>
			<h1>Upload Media Object (Image or Video)</h1>

			<form
				action="http://localhost:5000/looking-glass/upload"
				method="post"
				encType="multipart/form-data"
			>
				<label htmlFor="file">Choose a file:</label>
				<input type="file" id="file" name="file" accept="*" required />

				<br />

				<label htmlFor="description">Description:</label>
				<input type="text" id="description" name="description" required />
				<button type="submit">Upload</button>
			</form>
		</>
	),
};
