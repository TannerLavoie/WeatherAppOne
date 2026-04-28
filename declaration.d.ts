declare module '*.css';
declare module '*.svg';
declare module '*.css' {
    const content: Record<string, string>;
    export default content;
}