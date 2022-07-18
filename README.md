# TsCommand
Typescript command pattern library

## Example

1) Create different Commands and CommandHandlers. 
2) Register the CommandHandlers to a Mediator.
3) Execute Command on the Mediator.
4) Mediator will redirect the call to the appropriate CommandHandler. 

```typescript

class TestCommand extends Command<string> {
    public name: string = "Test command";
}

class TestCommandHandler extends CommandHandler<TestCommand, string> {
    public constructor() {
        super(TestCommand);
    }

    public handle(command: TestCommand): Promise<string> {
        return new Promise((resolve) => {
            resolve(`${command.name} has executed`);
        });
    }
}

let mediator = new Mediator([
    new TestCommandHandler()
]);

mediator.execute(new TestCommand());

```
