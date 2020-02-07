export type InputType =
    | 'text'
    | 'search'
    | 'tel'
    | 'url'
    | 'email'
    | 'password'
    | 'date'
    | 'month'
    | 'week'
    | 'time'
    | 'datetime-local'
    | 'number'
    | 'color'
    | 'countdown';

export type ValidationState = 'success' | 'warning' | 'error';
