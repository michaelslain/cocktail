const getShape = (obj: Record<string, any>): Record<string, any> => {
    const shape: Record<string, any> = {}

    for (const key of Object.keys(obj)) {
        const value = obj[key]

        if (typeof value === 'object' && value !== null) {
            if (Array.isArray(value)) {
                shape[key] = 'array'
            } else {
                shape[key] = getShape(value)
            }
        } else {
            shape[key] = typeof value
        }
    }

    return shape
}

export default getShape
