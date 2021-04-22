import React, { useRef, useState } from "react";

import { Button } from "react-bulma-components";

import { ErrorProvider, Error, useInputErrorColor } from "../Errors";

import { validateAll } from "utils/validation";

import { useFormFields, formatValues } from "./utils"

import { FormField } from "./components"

const Form = ({
	fields,
	fieldValueSource,
	validation,
	button,
	buttonText = "Submit",
	moreButtons = [],
	flat,
	className,
	onSubmit,
	commentRef,
  ifFocus,
	...props
}) => {
	const [formFields, fieldValues] = useFormFields(fields, fieldValueSource);

	const [isProcessing, setIsProcessing] = useState(false);
	const [errors, setErrors] = useState({});

	const formRef = useRef();

	const submitData = async (data) => {
		setIsProcessing(true);
		onSubmit && (await onSubmit(formatValues(data), setErrors));
		if (formRef.current) setIsProcessing(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (isProcessing) return;

		if (!validation) {
			submitData(fieldValues);
			return;
		}

		const [data, inputErrors, hasErrors] = Array.isArray(validation)
			? validateAll(fieldValues, validation)
			: validation(fieldValues);

		if (hasErrors) {
			setErrors(inputErrors);
			return;
		}

		setErrors({});

		submitData(data);
	};

	const inputErrorColor = useInputErrorColor(errors);

	const classes = className ? [className] : [];

	if (flat) classes.push("is-flat");
 
	return (
		<form
			ref={formRef}
			ref={commentRef}
			className={classes.join(" ")}
			onSubmit={handleSubmit}
			{...props}>
			<ErrorProvider value={errors}>
				<Error name="default" type="message" />
				{formFields.map((field) => (
					<FormField
						key={field.name}
						inputColor={inputErrorColor}
						className={`${commentRef ? "mb-0" : ""}`}
						ifFocus={ifFocus}
						{...field}
					/>
				))}
			</ErrorProvider>
			{flat ? null : <hr />}
			<div
				className={`is-flex ${
					button ? "" : "is-justify-content-flex-end py-2 pr-3"
				} `}>
				{button ? (
					button
				) : (
					<Button
						className="is-small"
						color="primary"
						loading={isProcessing}>
						{buttonText}
					</Button>
				)}
				{moreButtons}
			</div>
		</form>
	);
};

export default Form;
