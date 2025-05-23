import gsap from "gsap";
import { CustomEase } from "gsap/all";

gsap.registerPlugin(CustomEase);

const myEase1 = CustomEase.create("custom", "0.76, 0, 0.24, 1");
const myEase2 = CustomEase.create("custom", "0.40, 0, 0.24, 1")

export const COMPANY_EMAIL = "hr@codevider.com";
export const EMAIL_SUBJECT = "Collaboration Proposal";

export { myEase1, myEase2 };
