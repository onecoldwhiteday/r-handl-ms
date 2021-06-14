// I use class here to make it possible to faster check it in jest with toBeInstanceOf, otherwise
// it definitely should be interface or type, of course
export class IMessage {
	user: string;
	message: string;
	timestamp: number;
}
