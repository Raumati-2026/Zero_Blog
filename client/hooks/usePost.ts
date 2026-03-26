import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import { getPosts, getPostsById, addPost } from '../apis/blogs.ts'

export function usePosts() {
  const query = useQuery({
    queryKey: ['fruits'],
    queryFn: () => getPosts(),
  })
  return {
    ...query,
    // Extra queries go here e.g. addFruit: useAddFruit()
    add: useAddPost()
  }
}

export function usePostId(id: string) {
  const query = useQuery({
    queryKey: ['fruits'],
    queryFn: () => getPostsById(id),
  })
  return {
    ...query,
    // Extra queries go here e.g. addFruit: useAddFruit()
  }
}

export function useFruitsMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fruits'] })
    },
  })

  return mutation
}

// Query functions go here e.g. useAddFruit
export function useAddPost() {
  return useFruitsMutation(addPost)
}
