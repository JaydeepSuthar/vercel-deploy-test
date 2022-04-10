let required = (propertyType) => {
	return v => v && v.length > 0 || `You must input a ${propertyType}`
}
let minLength = (propertyType, minLength) => {
	return v => v && v.length >= minLength || `${propertyType} must be at least ${minLength} characters`
}
let maxLength = (propertyType, maxLength) => {
	return v => v && v.length <= maxLength || `${propertyType} must be less than ${maxLength} characters`
}

let urlFormat = () => {
	let regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
	return v => v && regex.test(v) || "Must be a valid url"
}

let emailFormat = () => {
	let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/
	return v => v && regex.test(v) || "Must be a valid email"
}


export default {
	required,
	minLength,
	maxLength,
	urlFormat,
	emailFormat
}
