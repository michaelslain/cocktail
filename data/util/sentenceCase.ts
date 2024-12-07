const sentenceCase = (str: string): string =>
    str.toLowerCase().replace(/^\s*\w/, c => c.toUpperCase())

export default sentenceCase
