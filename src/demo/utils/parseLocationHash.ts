export default (): string => {
    return window.location.hash.split('#')[1] as string;
};
