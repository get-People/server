import createDOMPurify from 'dompurify';
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
const purify = createDOMPurify(window);


export default purify;


