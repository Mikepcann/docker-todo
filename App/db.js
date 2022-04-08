import mongoose from 'mongoose'

const url ='mongodb://mongo:27017/todo'
// Function used to connect to the Database
const DBConnect = async () => {
	try {
		// Connect to the database with the connection string from the .env file
		await mongoose.connect(url)
		console.log('🗄  DB Connect was was a success!')
	} catch (error) {
		console.error(
			`THE DB FAILED 🤯 :\n.\n..\n...\n....\n.....\nPlease Check Your DB Connection... \n${error.message}`
		)
		await mongoose.connection.close()
		// Close the application if an error occurred.
		process.exit(1)
	}
}

export default DBConnect
