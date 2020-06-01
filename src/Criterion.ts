/**
 * Equivalent to Criterion in hibernate
 */
export default interface Criterion {
    fieldName: string,
    operator: string,
    value?: string
}