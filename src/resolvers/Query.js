async function feed(parent, args, context, info) {
	const where = args.filter ? {
		OR: [
			{ description_contains: args.filter },
			{ url_contains: args.filter },
		]
	} : {};

	const links = await context.prisma.links({
		where,
		skip: args.skip, // the `start index`, defaults to 0
		first: args.first, // limit: retrieving `first` x elements after a the start index
		orderBy: args.orderBy,
	});

	const count = await context.prisma
		.linksConnection({
			where,
		})
		.aggregate()
		.count();
	return {
		links,
		count,
	}
}

module.exports = {
	feed,
}
