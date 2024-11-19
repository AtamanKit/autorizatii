export function AbrOfFunc (abrOf) {
    if (abrOf === "FL") {
        abrOf = "Falesti"
    } else if (abrOf === "GL") {
        abrOf = "Glodeni"
    } else if (abrOf === "RS") {
        abrOf = "Riscani"
    } else if (abrOf === "UN") {
        abrOf = "Ungheni"
    }
    return abrOf
}