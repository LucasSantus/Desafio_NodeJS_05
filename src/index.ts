/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import Student from "./types/Student";

const csv = require('objects-to-csv')
const readline = require('readline-sync');

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
	process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Server Activation
 */

app.listen(PORT, async () => {
	console.log(`Listening on port ${PORT}`);

	let students: Array<Student> = [];
	let sum_note = 0.0

	for(let counter = 0; counter < 3; counter++){
		let name = readline.question('\nNome do aluno: ')
		let age = parseInt(readline.question('Idade do aluno: '))
		let note = parseFloat(readline.question('Nota do aluno: '))
		
		students.push({
			id: counter,
			name: name,
			age: age,
			note: note
		})
		sum_note += note
	}

	let students_name = students.map(item => {
		return item.name
	})
	
	console.log(`\nAlunos: ${students_name}`)
	console.log(`\nSoma da nota dos alunos: ${sum_note}`)

	const archive = new csv(students)

	await archive.toDisk('./students.csv')
});
