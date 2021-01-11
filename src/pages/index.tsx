import React, { ReactElement, useEffect, useState } from 'react';
import { NextPage } from 'next';

import Containers from '@containers';
import Presentations from '@presentations';

const indexPage: NextPage = () : ReactElement => {
    const [ hide, toggleHide ] = useState(true);

    useEffect(() => {
        let interval = setInterval(() => toggleHide(!hide), 1750);
        return () => clearInterval(interval);
    }, [ hide ]);

    return (
        <Containers.MainLayout>
            <Presentations.LettersTable hide={ hide } />
        </Containers.MainLayout>
    );
};

export default indexPage;