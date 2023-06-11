// import local
import {
    DESCRIPTION_TYPE,
    TIME_DIFFERENCE_VALUE
} from '~/notes/constants';

/**
 * verifica a diferença de tempo entre duas notas de suas datas 'created_at'
 * retorna um número inteiro
 */
export const getTimeDifferenceInMinutes = (noteBeginning, noteEnd) => {
    // notas de descrição
    const descriptionNoteBegin = new Date(noteBeginning.createdAt);
    const descriptionNoteEnd = new Date(noteEnd.createdAt);

    // diferença de tempo em minutos
    const timeDifferenceMinutes = (descriptionNoteEnd - descriptionNoteBegin) / 1000 / 60;

    return Math.ceil(timeDifferenceMinutes);
};

/**
 * verifica se uma nota é uma nota do sistema e se o conteúdo é uma descrição
 *
 * @param {Object} note
 * @returns {Boolean}
 */
export const isDescriptionSystemNote = (note) => {
    return note.system && note.body === DESCRIPTION_TYPE;
};

/**
 * recolhe as notas do sistema de um tipo de descrição, por exemplo mudou a descrição, n minutos atrás
 * as notas entrarão em colapso, desde que aconteçam a não mais de 10 minutos de distância de cada uma
 * entre as notas pode haver qualquer coisa, outro tipo de nota do sistema
 *
 * @param {Array} notes
 * @returns {Array}
 */
export const collapseSystemNotes = (notes) => {
    // notas de sistema da descrição
    let lastDescriptionSystemNote = null;
    let lastDescriptionSystemNoteIndex = -1;

    return notes.reduce((acc, currentNote) => {
        const note = currentNote.notes.nodes[0];

        let lastStartVersionId = '';

        if (isDescriptionSystemNote(note)) {
            // não se sabe se esse é o primeiro
            if (!lastDescriptionSystemNote) {
                lastDescriptionSystemNote = note;
            } else {
                const timeDifferenceMinutes = getTimeDifferenceInMinutes(lastDescriptionSystemNote, note);

                // não se sabe se eles estão separados por menos de 10 minutos do mesmo usuário
                if (
                    timeDifferenceMinutes > TIME_DIFFERENCE_VALUE ||
                    note.author.id !== lastDescriptionSystemNote.author.id ||
                    lastDescriptionSystemNote.systemNoteMetadata.descriptionVersion?.deleted
                ) {
                    // atualize a nota do sistema anterior

                    lastDescriptionSystemNote = note;
                } else {
                    // definir primeira versão para buscar versões de notas do sistema agrupadas

                    lastStartVersionId = lastDescriptionSystemNote.systemNoteMetadata.descriptionVersion.id;

                    // deletar anterior
                    acc.splice(lastDescriptionSystemNoteIndex, 1);
                }
            }

            // atualizar índice de notas do sistema anterior
            lastDescriptionSystemNoteIndex = acc.length;

            acc.push({
                notes: {
                    nodes: [
                        {
                            ...note,

                            systemNoteMetadata: {
                                ...note.systemNoteMetadata,

                                descriptionVersion: {
                                    ...note.systemNoteMetadata.descriptionVersion,

                                    startVersionId: lastStartVersionId
                                }
                            }
                        }
                    ]
                }
            });
        } else {
            acc.push(currentNote);
        }

        return acc;
    }, []);
};