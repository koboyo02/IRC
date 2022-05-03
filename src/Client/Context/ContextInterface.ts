export interface StackedContextInterface {
	push(context: ContextElementInterface): void;
	pop(): void;
	getStack(): ContextElementInterface[];
	current(): ContextElementInterface | undefined;
	destroy(): void;
}

export interface ContextElementInterface {
	willBeMounted(): void;
	mount(): void;
	willBeStacked(): void;
	willBeDestroyed(): void;
	destroy(): void;
}
