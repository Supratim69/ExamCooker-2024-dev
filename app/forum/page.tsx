import { PrismaClient } from '@prisma/client';
import React from 'react';
import ForumCard from '../components/ForumCard';
import SearchBar from '../components/SearchBar';
import NewForumButton from '../components/NewForumButton';


async function forum () {
  const prisma = new PrismaClient();
  const forumPosts = await prisma.forumPost.findMany({
    include: {
        author: true,
        tags: true,
        comments: true,
    },
});
  return (
    <div>
      <h1 className="text-4xl font-bold text-center">Forum</h1>
      <div className="flex items-center space-x-4 justify-center my-4">
        <SearchBar />
        <NewForumButton />
      </div>
      
      {forumPosts.map((eachPost) => (
                        <ForumCard
                            key={eachPost.id}
                            title={eachPost.title}
                            author={eachPost.author.name}
                            desc='some random description'
                            createdAt={eachPost.createdAt}
                            tags={eachPost.tags}
                            post={eachPost}
                            comments={eachPost.comments}
                        />
                    ))}
    </div>
  );
};

export default forum;

