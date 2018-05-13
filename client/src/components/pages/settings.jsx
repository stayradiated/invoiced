import React from 'react'

import SnippetManager from '../settings/snippetManager'

class SettingsPage extends React.Component {
  render () {
    return (
      <div className='page-settings'>
        <SnippetManager />
      </div>
    )
  }
}

export default SettingsPage
