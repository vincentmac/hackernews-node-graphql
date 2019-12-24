const { GraphQLServer } = require('graphql-yoga');

let links = [{
	id: 'link-0',
	url: 'www.howtographql.com',
	description: 'Fullstack tutorial for GraphQL'
}];

// 1
let idCount = links.length;


function getLinkById(id) {
	for (let i = 0; i < links.length; i++) {
		let link = links[i];
		if (link.id == id) {
			return link;
		}
	}
}

const resolvers = {
	Query: {
		info: () => `This is the API of a Hackernews Clone`,
		feed: () => links,
		// info: () => null 
		link: (parent, args) => {
			let {id} = args;
			return getLinkById(id);
		}
	},
	Mutation: {
		// 2
		post: (parent, args) => {
			const link = {
				id: `link-${idCount++}`,
				description: args.description,
				url: args.url,
			};
			links.push(link);
			return link;
		},
		updateLink: (parent, args) => {
			let {id, url, description} = args;
			let link = getLinkById(id);

			if (url) {
				link.url  = url;
			}

			if (description) {
				link.description  = description;
			}
			// TODO
		},
		deleteLink: (parent, args) => {
			// TODO
		},

	},
	// GraphQL.js will infer how it returns these fields based on the field name
	// Link: {
	// 	id: (parent) => parent.id,
	// 	description: (parent) => parent.description,
	// 	url: (parent) => parent.url,
	// }
};

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
});

server.start(() => console.log(`Server is running on localhost:4000`)); // http://penguin.linux.test:4000/

