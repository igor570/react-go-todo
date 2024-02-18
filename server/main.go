package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type todo struct {
	ID        int    `json:"id"`
	Title     string `json:"title"`
	Completed bool   `json:"completed"`
	Body      string `json:"body"`
}

func main() {
	fmt.Println("Hello, World!")

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	todos := []todo{} //global slice

	//--------HTTP Methods--------

	//Get all Todos

	app.Get("api/todos", func(context *fiber.Ctx) error {
		return context.JSON(todos)
	})

	//Add a new Todo

	app.Post("/api/todos", func(context *fiber.Ctx) error {
		todo := &todo{}

		err := context.BodyParser(todo)
		if err != nil {
			return err
		}

		todo.ID = len(todos) + 1
		todos = append(todos, *todo)

		return context.JSON(todos)

	})

	//Mark a Todo as done

	app.Patch("api/todos/:id/done", func(context *fiber.Ctx) error {
		id, err := context.ParamsInt("id")
		if err != nil {
			return context.Status(401).SendString("Invalid id")
		}

		for index, todo := range todos { //Loop through all todos, find id and mark done
			if todo.ID == id {
				todos[index].Completed = true
				break
			}
		}
		return context.JSON(todos)
	})

	//Delete a Todo

	app.Delete("/api/todos/:id", func(context *fiber.Ctx) error {
		id, err := context.ParamsInt("id")
		if err != nil {
			return context.Status(401).SendString("Invalid id")
		}

		for index, todo := range todos {
			if todo.ID == id {
				todos = append(todos[:index], todos[index+1:]...)
				break
			}
		}
		return context.JSON(todos)
	})

	log.Fatal(app.Listen(":5000"))
}
