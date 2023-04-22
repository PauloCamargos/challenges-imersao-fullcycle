package handler

import "encoding/json"

func jsonError(msg string) []byte {
	errorStruct := struct {
		Message string `json:"message"`
	}{
		msg,
	}
	result, err := json.Marshal(errorStruct)
	if err != nil {
		return []byte(err.Error())
	}
	return result
}
