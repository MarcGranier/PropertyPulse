import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';

// GET /api/properties/:id
export const GET = async (request, { params }) => {
	try {
		await connectDB();

		const property = await Property.findById(params.id);

		if (!property) return new Response('Property Not Found', { status: 404 });

		return new Response(JSON.stringify(property), {
			status: 200,
		});
	} catch (error) {
		return new Response('Something went wrong', { status: 500 });
	}
};

// GET /api/properties/:id
export const DELETE = async (request, { params }) => {
	try {
		const propertyId = params.id;

		const sessionUser = await getSessionUser();

		//Check for session
		if (!sessionUser || !sessionUser.userId) {
			return new Response('User Id is required', { status: 401 });
		}

		const { userId } = sessionUser;

		await connectDB();

		const property = await Property.findById(propertyId);

		if (!property) return new Response('Property Not Found', { status: 404 });

		//Verify ownership
		if (property.owner.toString() !== userId) {
			return new Response('Unauthorized', { staus: 401 });
		}

		await property.deleteOne();

		return new Response(JSON.stringify('Property Deleted,'), {
			status: 200,
		});
	} catch (error) {
		return new Response('Something went wrong', { status: 500 });
	}
};
