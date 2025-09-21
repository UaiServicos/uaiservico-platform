export interface FollowRelation {
  id: string
  followerId: string
  followingId: string
  createdAt: Date
}

// Mock follow data - replace with real database later
let followRelations: FollowRelation[] = [
  {
    id: "1",
    followerId: "client1",
    followingId: "provider2",
    createdAt: new Date(),
  },
]

export function isFollowing(followerId: string, followingId: string): boolean {
  return followRelations.some((relation) => relation.followerId === followerId && relation.followingId === followingId)
}

export function followProvider(followerId: string, followingId: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!isFollowing(followerId, followingId)) {
        followRelations.push({
          id: Date.now().toString(),
          followerId,
          followingId,
          createdAt: new Date(),
        })
      }
      resolve(true)
    }, 500)
  })
}

export function unfollowProvider(followerId: string, followingId: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      followRelations = followRelations.filter(
        (relation) => !(relation.followerId === followerId && relation.followingId === followingId),
      )
      resolve(true)
    }, 500)
  })
}

export function getFollowingList(followerId: string): string[] {
  return followRelations
    .filter((relation) => relation.followerId === followerId)
    .map((relation) => relation.followingId)
}

export function getFollowersList(followingId: string): string[] {
  return followRelations
    .filter((relation) => relation.followingId === followingId)
    .map((relation) => relation.followerId)
}

export function getFollowStats(userId: string): { following: number; followers: number } {
  const following = followRelations.filter((r) => r.followerId === userId).length
  const followers = followRelations.filter((r) => r.followingId === userId).length
  return { following, followers }
}
