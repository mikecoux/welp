/** @type {import('next').NextConfig} */

const API_URL = process.env.API_URL

module.exports = {
	async rewrites() {
        console.log("rewrites called")
		return [
			{
				source: '/api/:path*',
				destination: 'http://127.0.0.1:5555/:path*',
			},
		]
	},
}