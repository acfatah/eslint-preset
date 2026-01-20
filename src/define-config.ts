import antfu from '@antfu/eslint-config'

export function defineConfig(
  options: Parameters<typeof antfu>[0],
  ...userConfigs: Parameters<typeof antfu>[1][]
): ReturnType<typeof antfu> {
  return antfu(
    {
      formatters: true,
      typescript: true,
      ...(options ?? {}),
    },
    ...userConfigs,
  )
}
