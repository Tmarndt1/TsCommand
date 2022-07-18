/**
 * Generic Command class
 */
export abstract class Command<out TResult> {
    /**
     * Required to extract type from TResult
     */
    private _: TResult | undefined;
}