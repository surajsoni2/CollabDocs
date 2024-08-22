import CollaborativeRoom from '@/components/CollaborativeRoom';
import { getDocument } from '@/lib/actions/room.action';
import { getClerkUsers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

const Document = async ({ params: { id } }: SearchParamProps) => {
    // Checking user authenticationj
    const clerkUser = await currentUser();
    if (!clerkUser) redirect('/sign-in');

    // Finding whether the document/liveBlocks_Room exist with perticular room id and user
    // if not redirect to dashboard
    const room = await getDocument({
        roomId: id,
        userId: clerkUser.emailAddresses[0].emailAddress,
    });
    if (!room) redirect('/');

    // Extracting all the userIds/users who have access to this document/room
    const userIds = Object.keys(room.usersAccesses);
    // Here we are fetching user data(name,email,profilePhoto,etc) from clerk
    const users = await getClerkUsers({ userIds });

    // Managing user activity as Viewer/Editor for all users
    const usersData = users.map((user: User) => ({
        ...user,
        userType: room.usersAccesses[user.email]?.includes('room:write')
            ? 'editor'
            : 'viewer',
    }));

    const currentUserType = room.usersAccesses[
        clerkUser.emailAddresses[0].emailAddress
    ]?.includes('room:write')
        ? 'editor'
        : 'viewer';

    return (
        <main className="flex w-full flex-col items-center">
            <CollaborativeRoom
                roomId={id}
                roomMetadata={room.metadata}
                users={usersData}
                currentUserType={currentUserType}
            />
        </main>
    );
};

export default Document;
