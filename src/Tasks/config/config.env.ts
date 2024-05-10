export const getEnvToSST_2 = (nameEnv: string, config: any) => {
  try {
    return {
      [nameEnv]: (config as unknown as Record<string, string>)?.[nameEnv],
    };
  } catch (error) {
    console.log(`--------------------`);
    console.log(`${nameEnv} env is NULL`);
    console.log(`--------------------`);
    return { [nameEnv]: null };
  }
};
