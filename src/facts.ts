import { FactsType } from './interface';

export class Facts implements FactsType {
    private facts: Map<string, any>;

    get size(): number {
        return this.facts.size;
    }

    constructor() {
        this.facts = new Map();
    }

    put(name: string, value: any): void {
        this.facts.set(name, value);
    }

    get(name: string) {
        return this.facts.get(name);
    }

    remove(name: string): void {
        this.facts.delete(name);
    }

    clear(): void {
        this.facts.clear();
    }
}