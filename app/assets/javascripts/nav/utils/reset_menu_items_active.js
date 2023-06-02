// consts
const resetActiveInArray = (arr) => arr?.map((menuItem) => ({ ...menuItem, active: false }));

/**
 * esse método seta `active: false` para os itens do menu
 *
 * @returns navData
 */
export const resetMenuItemsActive = ({
    primary,
    secondary,

    ...navData
}) => {
    return {
        ...navData,

        primary: resetActiveInArray(primary),
        secondary: resetActiveInArray(secondary)
    };
};