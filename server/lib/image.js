const path = require('path')
const fs = require('fs').promises

const PRODUCTS_DIR = path.join(process.cwd(), 'static', 'products')

function safeFilename(name) {
	// faqat file nomini qoldiradi: "../../a.png" -> "a.png"
	return path.basename(String(name || ''))
}

async function deleteFilesFromProductsDir(filenames = []) {
	const tasks = filenames
		.map(safeFilename)
		.filter(Boolean)
		.map(async file => {
			const filePath = path.join(PRODUCTS_DIR, file)
			try {
				await fs.unlink(filePath)
			} catch (err) {
				// fayl topilmasa ham yiqitmaymiz
				if (err.code !== 'ENOENT') throw err
			}
		})

	// birorta fail bo'lsa ham qolganlari davom etsin
	const results = await Promise.allSettled(tasks)

	// agar xohlasang log qil:
	const failed = results.filter(r => r.status === 'rejected')
	if (failed.length) {
		console.error(
			'Some deletes failed:',
			failed.map(f => f.reason),
		)
	}
}

module.exports = { deleteFilesFromProductsDir }
