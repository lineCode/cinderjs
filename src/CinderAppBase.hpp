/*
 Copyright (c) Sebastian Herrlinger - All rights reserved.
 This code is intended for use with the Cinder C++ library: http://libcinder.org
 
 Redistribution and use in source and binary forms, with or without modification, are permitted provided that
 the following conditions are met:
 
 * Redistributions of source code must retain the above copyright notice, this list of conditions and
 the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and
 the following disclaimer in the documentation and/or other materials provided with the distribution.
 
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
 WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
 ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 POSSIBILITY OF SUCH DAMAGE.
 */
#ifndef _CinderAppBase_hpp_
#define _CinderAppBase_hpp_

#pragma once

#include <boost/shared_ptr.hpp>

#include "v8.h"
#include "PipeModule.hpp"

namespace cjs {

  class CinderAppBase {
    public:
      CinderAppBase(){}
      ~CinderAppBase(){}
    
      /**
       * Add a module
       * Returns true if module successfully added
       */
      inline bool addModule( boost::shared_ptr<PipeModule> mod )
      {
        mod->setIsolate( *mIsolate );
        mod->loadGlobalJS( mGlobal );
        MODULES.push_back( mod );
        return true;
      }

    protected:
      std::vector<boost::shared_ptr<PipeModule>> MODULES;
      v8::Isolate* mIsolate;
      v8::Local<v8::Context> mMainContext;
      v8::Local<v8::ObjectTemplate> mGlobal;
    
  };
  
} // namespace cjs

#endif