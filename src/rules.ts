import { RuleType, RulesType } from './interface';

export class Rules implements RulesType {
    private rules: RuleType[];

    get size(): number {
        return this.rules.length;
    }

    constructor() {
        this.rules = [];
    }

    register(rule: RuleType): void {
        this.rules.push(rule);
    }

    getRules(): RuleType[] {
        return this.rules;
    }
}