const { GraphQLServer } = require('graphql-yoga');

// in SDL nomenclature , `info` is a "root field" 
const typeDefs = `
type Query {
	info: String!
	feed: [Link!]!
}

type Link {
	id: ID!
	description: String!
	url: String!
}
`;

// 1
let links = [{
	id: 'link-0',
	url: 'www.howtographql.com',
	description: 'Fullstack tutorial for GraphQL'
}];

const resolvers = {
	Query: {
		info: () => `This is the API of a Hackernews Clone`,
		// 2
		feed: () => links,
		// info: () => null 
	},
	// 3
	Link: {
		id: (parent) => parent.id,
		description: (parent) => parent.description,
		url: (parent) => parent.url,
	}
};

const server = new GraphQLServer({
	typeDefs,
	resolvers,
});

server.start(() => console.log(`Server is running on localhost:4000`)); // http://penguin.linux.test:4000/

