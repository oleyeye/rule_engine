import { FactsType, RuleEngineType, RuleListenerType, RuleEngineListenerType, RulesType, RuleType } from './interface';

export class DefaultRuleEngine implements RuleEngineType {
    ruleListener: RuleListenerType;
    engineListener: RuleEngineListenerType;

    get isValidRuleListener(): boolean {
        return this.ruleListener !== undefined && this.ruleListener !== null;
    }

    get isValidEngineListener(): boolean {
        return this.engineListener !== undefined && this.engineListener !== null;
    }

    fire(rules: RulesType, facts: FactsType): void {
        if (this.isValidEngineListener) {
            this.engineListener.beforeEvaluate(rules, facts);
        }

        rules.getRules().forEach(rule => this.executeRule(rule, facts));

        if (this.isValidEngineListener) {
            this.engineListener.beforeEvaluate(rules, facts);
        }
    }

    registerRuleListener(ruleListener: RuleListenerType): void {
        this.ruleListener = ruleListener;
    }

    registerEngineListener(engineListener: RuleEngineListenerType): void {
        this.engineListener = engineListener;
    }

    protected executeRule(rule: RuleType, facts: FactsType): void {
        let shouldBeEvaluated = true;
        if (this.isValidRuleListener) {
            shouldBeEvaluated = this.ruleListener.beforeEvaluate(rule);
        }

        if (!shouldBeEvaluated) {
            return;
        }

        //evaluation
        let matched = false;
        try { matched = rule.when(facts); }
        catch (ex: any) {
            if (this.isValidRuleListener) {
                this.ruleListener.onEvaluationError(rule, facts, ex);
            }
        }

        if (this.isValidRuleListener) {
            this.ruleListener.afterEvaluate(rule, matched);
        }

        //execute
        if (matched) {
            if (this.isValidRuleListener) {
                this.ruleListener.beforeEvaluate(rule);
            }

            try {
                rule.then(facts);
            } catch (ex: any) {
                if (this.isValidRuleListener) {
                    this.ruleListener.onFailure(rule, facts, ex);
                    this.ruleListener.afterEvaluate(rule, false);
                }
                return;
            }

            if (this.isValidRuleListener) {
                this.ruleListener.onSuccess(rule, facts);
                this.ruleListener.afterEvaluate(rule, true);
            }
        }
    }

}