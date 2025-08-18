function SačuvajVrijednostPoKljuču(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value)
    return true
  } catch (error) {
    console.error(`Грешка при чувању у localStorage за кључ '${key}':`, error)
    return false
  }
}

function PročitajVrijednostPoKljuču(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch (error) {
    console.error(`Грешка при читању из localStorage за кључ '${key}':`, error)
    return null
  }
}

function ObrišiVrijednostPoKljuču(key: string): boolean {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Грешка при брисању из localStorage за кључ '${key}':`, error)
    return false
  }
}

export { SačuvajVrijednostPoKljuču, PročitajVrijednostPoKljuču, ObrišiVrijednostPoKljuču };