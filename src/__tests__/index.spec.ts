import { RuleType, Rules, Facts, DefaultRuleEngine } from '../index';
import { FactsType, RuleEngineListenerType, RuleListenerType, RulesType } from '../interface';

class CustomizedRule implements RuleType {
    when(facts: FactsType): boolean {
        console.log('Facts', facts);
        const randInt = Math.floor(Math.random() * 100);
        return randInt % 2 === 0;
    }

    then(facts: FactsType): void {
        console.log('Facts: ', facts);
        console.log('Perform the action');
    }
}

class CustomizedRuleWithoutParam implements RuleType {
    when(): boolean {
        return true;
    }
    then(): void {
        console.log('Perform the action with no param');
    }
}

class CustomizedRuleNotExecute implements RuleType {
    when(): boolean {
        return false;
    }
    then(facts: FactsType): void {
        facts.put("result", "done")
    }
}

class CustomizedRuleWithParam implements RuleType {
    when(facts: FactsType): boolean {
        const name = facts.get("name");
        return name === "batman";
    }
    then(facts: FactsType): void {
        console.log(`The ${facts.get("name")} is ok?-${facts.get("isOk")}`);
    }
}

class CustomizedRuleWithReturnValue implements RuleType {
    when(facts: FactsType): boolean {
        const name = facts.get("name");
        return name === "batman";
    }

    then(facts: FactsType): void {
        facts.put('TotalAsset', 99999);
    }
}

class CustomizedRuleForListener implements RuleType {
    when(facts: FactsType): boolean {
        const name = facts.get("name");
        return name.trim() === "batman";
    }
    then(facts: FactsType): void {
        console.log(facts.get("message").toUpperCase());
    }
}

class CustomizedRuleListener implements RuleListenerType {
    beforeEvaluate(rule: RuleType): boolean {
        return true;
    }
    afterEvaluate(rule: RuleType, evaluationResult: boolean) {
        console.log('afterEvaluate', rule, evaluationResult);
    }
    onEvaluationError(rule: RuleType, facts: FactsType, exception: Error) {
        console.log('onEvaluationError', rule, facts, exception);
    }
    beforeExecute(rule: RuleType, facts: FactsType) {
        console.log('beforeExecute', rule, facts);
    }
    onSuccess(rule: RuleType, facts: FactsType) {
        console.log('onSuccess', rule, facts);
    }
    onFailure(rule: RuleType, facts: FactsType, exception: Error) {
        console.log('onFailure', rule, facts, exception);
    }
}

class CustomizedRuleEngineListener implements RuleEngineListenerType {
    beforeEvaluate(rule: RulesType, facts: FactsType): void {
        console.log('beforeEvaluate', rule, facts);
    }
    afterExecute(rule: RulesType, facts: FactsType): void {
        console.log('afterExecute', rule, facts);
    }
}

test('General test rule engine', () => {
    let facts = new Facts();
    facts.put("name", "batman");
    facts.put("isOk", true);
    facts.put("object", { superPower: 'rich' });

    let rules = new Rules();
    rules.register(new CustomizedRule());

    let engine = new DefaultRuleEngine();
    engine.fire(rules, facts);

    expect(rules.size).toBe(1);
    expect(facts.size).toBe(3);
    facts.remove("object")
    expect(facts.size).toBe(2);
    facts.clear();
    expect(facts.size).toBe(0);
})

test('General test rule engine without param', () => {
    let facts = new Facts();

    let rules = new Rules();
    rules.register(new CustomizedRuleWithoutParam());

    let engine = new DefaultRuleEngine();
    engine.fire(rules, facts);
})

test('General test rule engine not execution', () => {
    let facts = new Facts();
    facts.put("name", "batman");
    facts.put("isOk", true);
    facts.put("object", { superPower: 'rich' });
    expect(facts.size).toBe(3);

    let rules = new Rules();
    rules.register(new CustomizedRuleNotExecute());

    let engine = new DefaultRuleEngine();
    engine.fire(rules, facts);
    expect(facts.size).toBe(3);
})

test('General test rule engine with param', () => {
    let facts = new Facts();
    facts.put("name", "batman");
    facts.put("isOk", true);
    facts.put("object", { superPower: 'rich' });

    let rules = new Rules();
    rules.register(new CustomizedRuleWithParam());

    let engine = new DefaultRuleEngine();
    engine.fire(rules, facts);
})

