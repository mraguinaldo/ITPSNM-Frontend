const UseRenameClass = (currentLevel: string) => {
  const level =
    currentLevel === 'CLASS_10'
      ? '10ª Classe'
      : currentLevel === 'CLASS_11'
        ? '11ª Classe'
        : currentLevel === 'CLASS_12'
          ? '12ª Classe'
          : '13ª Classe'

  return level
}

export { UseRenameClass }
