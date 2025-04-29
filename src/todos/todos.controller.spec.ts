import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

describe('TodosController', () => {
	let todosController: TodosController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [TodosController],
			providers: [TodosService],
		}).compile();

		todosController = app.get<TodosController>(TodosController);
	});

	describe('todos', () => {
		it('get all the todos', () => {
			expect(todosController.getHello()).toBe('Hello, World!');
		});
	});
});
