export interface RuleType {
    when(arg?: FactsType): boolean;

    then(arg?: FactsType): void;
}

export interface RulesType {
    readonly size: number;
    register(rule: RuleType): void;

    getRules(): RuleType[];
}

export interface FactsType {
    readonly size: number;
    put(name: string, value: any): void;
    get(name: string): any;
    remove(name: string): void;
    clear(): void;
}

export interface RuleEngineType {
    readonly ruleListener: RuleListenerType;
    fire(rules: RulesType, facts: FactsType): void;
    registerRuleListener(ruleListener: RuleListenerType): void;
    registerEngineListener(engineListener: RuleEngineListenerType): void;
}

export interface RuleListenerType {
    beforeEvaluate: BeforeEvaluateFunc;

    afterEvaluate: AfterEvaluateFunc;

    onEvaluationError: OnEvaluationErrorFunc;

    beforeExecute: BeforeExecuteFunc;

    onSuccess: OnSuccessFunc;

    onFailure: OnFailureFunc;
}

export interface RuleEngineListenerType {
    beforeEvaluate: EngineEvaluateFunc;

    afterExecute: EngineEvaluateFunc;
}

export interface BeforeEvaluateFunc {
    (rule: RuleType): boolean;
}

export interface AfterEvaluateFunc {
    (rule: RuleType, evaluationResult: boolean): void;
}

export interface OnEvaluationErrorFunc {
    (rule: RuleType, facts: FactsType, exception: Error): void;
}

export interface BeforeExecuteFunc {
    (rule: RuleType, facts: FactsType): void;
}
export interface OnSuccessFunc {
    (rule: RuleType, facts: FactsType): void;
}

export interface OnFailureFunc {
    (rule: RuleType, facts: FactsType, exception: Error): void;
}

export interface EngineEvaluateFunc {
    (rules: RulesType, facts: FactsType): void;
}