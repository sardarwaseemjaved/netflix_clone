import axios, { AxiosError } from "axios";

function handleDefaultError(error: Error) {
    if (error.message) {
        console.log(error.message)
        alert(error.message)
    }
    else {
        console.log(error)
        alert('Unknown Error');
    }
}
export function errorHandler(error: any) {
    if (axios.isAxiosError(error)) {
        const response = error.response;
        if (response) {
            const data: Error = response.data;
            console.error(data.message);
            alert(data.message);
        } else {
            handleDefaultError(error)
        }
    } else {
        handleDefaultError(error)
    }
}